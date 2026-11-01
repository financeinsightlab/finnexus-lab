// lib/ai/providers/groq.ts — Groq Provider Adapter
//
// Official API endpoint: https://api.groq.com/openai/v1/chat/completions

import 'server-only';
import type {
  AIProviderAdapter,
  AIChatMessage,
  AICompletionOptions,
  AICompletionResponse,
  AICredentialDecrypted,
} from '../types';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

interface GroqChatResponse {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
    finish_reason?: string;
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  error?: {
    message?: string;
    type?: string;
    code?: string;
  };
}

export class GroqProviderAdapter implements AIProviderAdapter {
  id = 'groq' as const;
  name = 'Groq';
  defaultModel = 'llama-3.3-70b-versatile';
  supportedModels = [
    'llama-3.3-70b-versatile',
    'llama-3.1-8b-instant',
    'mixtral-8x7b-32768',
    'gemma2-9b-it',
  ];

  async chatCompletion(
    messages: AIChatMessage[],
    options: AICompletionOptions,
    credential: AICredentialDecrypted
  ): Promise<AICompletionResponse> {
    const startTime = Date.now();
    const model = options.model || this.defaultModel;

    const body: Record<string, unknown> = {
      model,
      messages,
      temperature: options.temperature ?? 0.3,
      max_tokens: options.maxTokens ?? 1000,
      stream: false,
    };

    if (options.responseFormat === 'json') {
      body.response_format = { type: 'json_object' };
    }

    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${credential.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: options.signal ?? AbortSignal.timeout(25_000),
    });

    const latencyMs = Date.now() - startTime;

    if (!res.ok) {
      let errMsg = `HTTP ${res.status}`;
      try {
        const errJson = (await res.json()) as GroqChatResponse;
        if (errJson.error?.message) {
          errMsg = `${res.status}: ${errJson.error.message}`;
        }
      } catch {
        // default message
      }
      throw new Error(`Groq API error (${errMsg})`);
    }

    const data = (await res.json()) as GroqChatResponse;
    const choice = data.choices?.[0];
    const text = choice?.message?.content?.trim() ?? '';

    if (!text) {
      throw new Error('Groq returned an empty response choice');
    }

    return {
      text,
      provider: 'groq',
      model,
      credentialId: credential.id,
      usage: {
        promptTokens: data.usage?.prompt_tokens,
        completionTokens: data.usage?.completion_tokens,
        totalTokens: data.usage?.total_tokens,
      },
      latencyMs,
      fallbackUsed: false,
      raw: data,
    };
  }

  async testConnection(
    credential: AICredentialDecrypted,
    modelName?: string
  ): Promise<{ success: boolean; latencyMs: number; error?: string }> {
    const startTime = Date.now();
    try {
      const model = modelName || this.defaultModel;

      const res = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${credential.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: 'Ping' }],
          max_tokens: 5,
        }),
        signal: AbortSignal.timeout(10_000),
      });

      const latencyMs = Date.now() - startTime;

      if (!res.ok) {
        let errMsg = `HTTP ${res.status}`;
        try {
          const errData = (await res.json()) as GroqChatResponse;
          if (errData.error?.message) errMsg = errData.error.message;
        } catch {
          // ignore
        }
        return { success: false, latencyMs, error: errMsg };
      }

      return { success: true, latencyMs };
    } catch (err) {
      return {
        success: false,
        latencyMs: Date.now() - startTime,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }
}

export const groqAdapter = new GroqProviderAdapter();

