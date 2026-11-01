// lib/ai/gateway.ts — Central AI Gateway
//
// Mandate: Single entry point for all platform AI interactions.
// Supports: Primary dispatch, intelligent credential selection, circuit breaking,
// max 1 fallback attempt, and institutional usage tracking.

import 'server-only';
import { prisma } from '@/lib/prisma';
import { aiProviderRegistry } from './provider-registry';
import { aiCredentialManager } from './credential-manager';
import { aiRouter } from './router';
import type {
  AITaskId,
  AIChatMessage,
  AICompletionOptions,
  AICompletionResponse,
  AIProviderId,
} from './types';

export class AIGatewayError extends Error {
  constructor(
    message: string,
    public code: 'KILL_SWITCH' | 'NO_CREDENTIALS' | 'RATE_LIMIT' | 'TIMEOUT' | 'ALL_PROVIDERS_FAILED' | 'DISABLED',
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'AIGatewayError';
  }
}

// Global kill switch state
let globalKillSwitch = false;

export function setGlobalAiKillSwitch(disabled: boolean): void {
  globalKillSwitch = disabled;
}

export function isGlobalAiKillSwitchActive(): boolean {
  return globalKillSwitch || process.env.AI_EMERGENCY_KILL_SWITCH === 'true';
}

function isEligibleForFallback(error: unknown): boolean {
  if (!error) return false;
  const msg = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  // Rate limit, timeout, 5xx, network drops, empty candidate
  return (
    msg.includes('429') ||
    msg.includes('rate limit') ||
    msg.includes('timeout') ||
    msg.includes('500') ||
    msg.includes('502') ||
    msg.includes('503') ||
    msg.includes('504') ||
    msg.includes('network') ||
    msg.includes('empty') ||
    msg.includes('fetch failed') ||
    msg.includes('econnreset')
  );
}

class CentralAIGateway {
  /**
   * Main text chat completion method
   */
  async chat(
    task: AITaskId,
    messages: AIChatMessage[],
    options: AICompletionOptions = {}
  ): Promise<AICompletionResponse> {
    if (isGlobalAiKillSwitchActive()) {
      throw new AIGatewayError('AI system is temporarily disabled by global emergency kill-switch.', 'KILL_SWITCH');
    }

    const route = await aiRouter.getRoute(task);
    if (!route.enabled) {
      throw new AIGatewayError(`AI task "${task}" is disabled by administrator.`, 'DISABLED');
    }

    const mergedOptions: AICompletionOptions = {
      ...options,
      model: options.model || route.primaryModel,
      temperature: options.temperature ?? route.temperature,
      maxTokens: options.maxTokens ?? route.maxTokens,
    };

    let primaryError: unknown = null;
    let primaryCredentialId: string | undefined;

    // 1. Primary Provider Attempt
    const primaryAdapter = aiProviderRegistry.get(route.primaryProvider);
    if (primaryAdapter) {
      const cred = await aiCredentialManager.selectCredential(route.primaryProvider);
      if (cred) {
        primaryCredentialId = cred.id;
        try {
          const result = await primaryAdapter.chatCompletion(messages, mergedOptions, cred);

          // Success — record metrics
          await aiCredentialManager.recordUsage(cred.id, true);
          this.logUsageAsync({
            task,
            provider: route.primaryProvider,
            model: mergedOptions.model || route.primaryModel,
            credentialId: cred.id,
            status: 'SUCCESS',
            latencyMs: result.latencyMs,
            promptTokens: result.usage?.promptTokens,
            completionTokens: result.usage?.completionTokens,
            totalTokens: result.usage?.totalTokens,
            fallbackUsed: false,
          });

          return result;
        } catch (err) {
          primaryError = err;
          const errMsg = err instanceof Error ? err.message : String(err);
          await aiCredentialManager.recordUsage(cred.id, false, errMsg);
          console.warn(`[AI Gateway] Primary provider (${route.primaryProvider}) failed for task "${task}":`, errMsg);
        }
      } else {
        primaryError = new Error(`No operational credentials for primary provider "${route.primaryProvider}"`);
      }
    }

    // 2. Check Fallback Eligibility
    const canFallback =
      route.fallbackProvider &&
      route.fallbackProvider !== route.primaryProvider &&
      (primaryError === null || isEligibleForFallback(primaryError));

    if (canFallback && route.fallbackProvider) {
      const fallbackAdapter = aiProviderRegistry.get(route.fallbackProvider);
      if (fallbackAdapter) {
        const fallbackCred = await aiCredentialManager.selectCredential(route.fallbackProvider);
        if (fallbackCred) {
          const fallbackOptions: AICompletionOptions = {
            ...mergedOptions,
            model: route.fallbackModel || fallbackAdapter.defaultModel,
          };

          try {
            const fallbackResult = await fallbackAdapter.chatCompletion(
              messages,
              fallbackOptions,
              fallbackCred
            );

            // Success on fallback
            fallbackResult.fallbackUsed = true;
            await aiCredentialManager.recordUsage(fallbackCred.id, true);

            this.logUsageAsync({
              task,
              provider: route.primaryProvider,
              model: mergedOptions.model || route.primaryModel,
              credentialId: primaryCredentialId,
              status: 'FALLBACK_TRIGGERED',
              latencyMs: fallbackResult.latencyMs,
              promptTokens: fallbackResult.usage?.promptTokens,
              completionTokens: fallbackResult.usage?.completionTokens,
              totalTokens: fallbackResult.usage?.totalTokens,
              fallbackUsed: true,
              fallbackProvider: route.fallbackProvider,
              fallbackModel: fallbackOptions.model,
            });

            return fallbackResult;
          } catch (fallbackErr) {
            const errMsg = fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr);
            await aiCredentialManager.recordUsage(fallbackCred.id, false, errMsg);
            console.warn(`[AI Gateway] Fallback provider (${route.fallbackProvider}) also failed for task "${task}":`, errMsg);
          }
        }
      }
    }

    // Both primary and fallback failed or no credentials available
    const finalErrMessage = primaryError instanceof Error ? primaryError.message : 'All AI providers unavailable';
    this.logUsageAsync({
      task,
      provider: route.primaryProvider,
      model: mergedOptions.model || route.primaryModel,
      credentialId: primaryCredentialId,
      status: 'ERROR',
      latencyMs: 0,
      fallbackUsed: false,
      errorCategory: primaryError && isEligibleForFallback(primaryError) ? 'NETWORK_OR_RATE_LIMIT' : 'PROVIDER_FAILURE',
      errorMessage: finalErrMessage.slice(0, 200),
    });

    throw new AIGatewayError(finalErrMessage, 'ALL_PROVIDERS_FAILED', primaryError);
  }

  /**
   * JSON completion helper with automatic schema extraction and validation
   */
  async json<T = unknown>(
    task: AITaskId,
    messages: AIChatMessage[],
    options: AICompletionOptions = {}
  ): Promise<{ data: T; response: AICompletionResponse }> {
    const response = await this.chat(task, messages, {
      ...options,
      responseFormat: 'json',
    });

    const trimmed = response.text.trim();
    let parsed: unknown;

    try {
      parsed = JSON.parse(trimmed);
    } catch {
      // Try extracting json substring if models wraps in markdown blocks
      const jsonMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || trimmed.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } else {
        throw new Error('AI response did not contain valid JSON structure');
      }
    }

    return {
      data: parsed as T,
      response,
    };
  }

  private async logUsageAsync(data: {
    task: string;
    provider: string;
    model: string;
    credentialId?: string;
    status: string;
    latencyMs: number;
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
    fallbackUsed: boolean;
    fallbackProvider?: string;
    fallbackModel?: string;
    errorCategory?: string;
    errorMessage?: string;
  }): Promise<void> {
    try {
      await prisma.aIUsageLog.create({
        data: {
          task: data.task,
          provider: data.provider,
          model: data.model,
          credentialId: data.credentialId && !data.credentialId.startsWith('env-') ? data.credentialId : null,
          status: data.status,
          latencyMs: data.latencyMs,
          promptTokens: data.promptTokens,
          completionTokens: data.completionTokens,
          totalTokens: data.totalTokens,
          fallbackUsed: data.fallbackUsed,
          fallbackProvider: data.fallbackProvider,
          fallbackModel: data.fallbackModel,
          errorCategory: data.errorCategory,
          errorMessage: data.errorMessage,
        },
      });
    } catch {
      // Non-blocking log insert
    }
  }
}

export const aiGateway = new CentralAIGateway();

