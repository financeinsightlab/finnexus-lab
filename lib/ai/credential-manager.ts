// lib/ai/credential-manager.ts — Multi-Credential Management and Intelligent Selection
//
// Mandate:
// 1. Non-random credential selection based on priority, circuit status, cooldown, and health.
// 2. Encrypted storage in DB.
// 3. Masked presentation only for client.

import 'server-only';
import { prisma } from '@/lib/prisma';
import {
  encryptSecret,
  decryptSecret,
  maskApiKey,
} from './credential-encryption';
import { aiCircuitBreaker } from './circuit-breaker';
import { aiProviderRegistry } from './provider-registry';
import type {
  AIProviderId,
  AICredentialDecrypted,
} from './types';

export interface AddCredentialInput {
  providerId: AIProviderId;
  label: string;
  apiKey: string;
  priority?: number;
  requestLimitPerMinute?: number;
}

class AICredentialManager {
  /**
   * Ensure provider config row exists in DB
   */
  async ensureProviderConfig(provider: AIProviderId): Promise<string> {
    const existing = await prisma.aIProviderConfig.findUnique({
      where: { provider },
    });

    if (existing) return existing.id;

    const adapter = aiProviderRegistry.get(provider);
    const created = await prisma.aIProviderConfig.create({
      data: {
        provider,
        label: adapter?.name || provider.toUpperCase(),
        enabled: true,
        priority: provider === 'gemini' ? 1 : 2,
        defaultModel: adapter?.defaultModel || (provider === 'gemini' ? 'gemini-2.0-flash' : 'llama-3.3-70b-versatile'),
      },
    });

    return created.id;
  }

  /**
   * Adds and encrypts a new provider credential in DB
   */
  async addCredential(input: AddCredentialInput): Promise<{ id: string; maskedKey: string; label: string }> {
    const providerConfigId = await this.ensureProviderConfig(input.providerId);
    const encrypted = encryptSecret(input.apiKey.trim());
    const masked = maskApiKey(input.apiKey.trim());

    const created = await prisma.aIProviderCredential.create({
      data: {
        providerId: providerConfigId,
        label: input.label.trim(),
        maskedKey: masked,
        encryptedSecret: encrypted.ciphertext,
        nonce: encrypted.nonce,
        authTag: encrypted.authTag,
        keyVersion: encrypted.keyVersion,
        priority: input.priority ?? 1,
        requestLimitPerMinute: input.requestLimitPerMinute ?? 60,
        enabled: true,
        status: 'ACTIVE',
      },
    });

    return {
      id: created.id,
      maskedKey: created.maskedKey,
      label: created.label,
    };
  }

  /**
   * Tests connectivity for a stored credential
   */
  async testCredential(credentialId: string): Promise<{ success: boolean; latencyMs: number; error?: string }> {
    const record = await prisma.aIProviderCredential.findUnique({
      where: { id: credentialId },
      include: { provider: true },
    });

    if (!record) {
      return { success: false, latencyMs: 0, error: 'Credential not found' };
    }

    try {
      const decryptedSecret = decryptSecret({
        ciphertext: record.encryptedSecret,
        nonce: record.nonce,
        authTag: record.authTag,
        keyVersion: record.keyVersion,
      });

      const adapter = aiProviderRegistry.get(record.provider.provider as AIProviderId);
      if (!adapter) {
        return { success: false, latencyMs: 0, error: `Unsupported provider: ${record.provider.provider}` };
      }

      const decrypted: AICredentialDecrypted = {
        id: record.id,
        providerId: record.provider.provider as AIProviderId,
        label: record.label,
        apiKey: decryptedSecret,
        maskedKey: record.maskedKey,
        priority: record.priority,
        enabled: record.enabled,
        status: record.status,
      };

      const result = await adapter.testConnection(decrypted, record.provider.defaultModel);

      // Update record health
      await prisma.aIProviderCredential.update({
        where: { id: credentialId },
        data: {
          lastTestedAt: new Date(),
          status: result.success ? 'ACTIVE' : 'FAILED',
          lastErrorCode: result.success ? null : (result.error?.slice(0, 50) || 'UNKNOWN_ERROR'),
        },
      });

      if (result.success) {
        aiCircuitBreaker.recordSuccess(credentialId);
      } else {
        aiCircuitBreaker.recordFailure(credentialId);
      }

      return result;
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      await prisma.aIProviderCredential.update({
        where: { id: credentialId },
        data: {
          lastTestedAt: new Date(),
          status: 'FAILED',
          lastErrorCode: errMsg.slice(0, 50),
        },
      });
      return { success: false, latencyMs: 0, error: errMsg };
    }
  }

  /**
   * Intelligent credential selection for active inference
   */
  async selectCredential(providerId: AIProviderId): Promise<AICredentialDecrypted | null> {
    const config = await prisma.aIProviderConfig.findUnique({
      where: { provider: providerId },
      include: {
        credentials: {
          where: { enabled: true },
          orderBy: [
            { priority: 'asc' },
            { totalErrors: 'asc' },
            { lastUsedAt: 'asc' },
          ],
        },
      },
    });

    const now = new Date();

    if (config && config.enabled && config.credentials.length > 0) {
      // Find highest priority available credential not in cooldown or open circuit
      for (const cred of config.credentials) {
        if (cred.cooldownUntil && cred.cooldownUntil > now) {
          continue;
        }

        if (!aiCircuitBreaker.canAttempt(cred.id)) {
          continue;
        }

        try {
          const secret = decryptSecret({
            ciphertext: cred.encryptedSecret,
            nonce: cred.nonce,
            authTag: cred.authTag,
            keyVersion: cred.keyVersion,
          });

          return {
            id: cred.id,
            providerId,
            label: cred.label,
            apiKey: secret,
            maskedKey: cred.maskedKey,
            priority: cred.priority,
            enabled: cred.enabled,
            status: cred.status,
            cooldownUntil: cred.cooldownUntil,
            requestLimitPerMinute: cred.requestLimitPerMinute,
          };
        } catch (decryptErr) {
          console.error(`Failed to decrypt credential ${cred.id}:`, decryptErr);
          // Mark credential as degraded
          await prisma.aIProviderCredential.update({
            where: { id: cred.id },
            data: { status: 'DEGRADED', lastErrorCode: 'DECRYPTION_FAILED' },
          });
        }
      }
    }

    // Fallback: Check environment variable bootstrap if DB has no active credentials
    const envKey =
      providerId === 'gemini'
        ? process.env.GEMINI_API_KEY
        : process.env.GROQ_API_KEY;

    if (envKey && envKey.trim().length > 5) {
      return {
        id: `env-${providerId}-bootstrap`,
        providerId,
        label: `Environment Bootstrap (${providerId})`,
        apiKey: envKey.trim(),
        maskedKey: maskApiKey(envKey.trim()),
        priority: 99,
        enabled: true,
        status: 'ACTIVE',
      };
    }

    return null;
  }

  /**
   * Updates usage stats after a successful or failed request
   */
  async recordUsage(
    credentialId: string,
    success: boolean,
    errorCode?: string
  ): Promise<void> {
    if (credentialId.startsWith('env-')) return; // skip env bootstrap

    try {
      if (success) {
        aiCircuitBreaker.recordSuccess(credentialId);
        await prisma.aIProviderCredential.update({
          where: { id: credentialId },
          data: {
            totalRequests: { increment: 1 },
            totalSuccess: { increment: 1 },
            lastUsedAt: new Date(),
            status: 'ACTIVE',
          },
        });
      } else {
        aiCircuitBreaker.recordFailure(credentialId);
        const isRateLimit = errorCode?.includes('429');
        const cooldown = isRateLimit ? new Date(Date.now() + 60_000) : undefined;

        await prisma.aIProviderCredential.update({
          where: { id: credentialId },
          data: {
            totalRequests: { increment: 1 },
            totalErrors: { increment: 1 },
            lastUsedAt: new Date(),
            lastErrorCode: errorCode?.slice(0, 50) || 'REQUEST_FAILED',
            ...(cooldown ? { cooldownUntil: cooldown, status: 'RATE_LIMITED' } : {}),
          },
        });
      }
    } catch {
      // Ignore background stats update failures
    }
  }

  /**
   * Sets temporary cooldown on a credential
   */
  async setCooldown(credentialId: string, durationSeconds: number): Promise<void> {
    await prisma.aIProviderCredential.update({
      where: { id: credentialId },
      data: {
        cooldownUntil: new Date(Date.now() + durationSeconds * 1000),
        status: 'RATE_LIMITED',
      },
    });
  }

  /**
   * Deletes a credential
   */
  async deleteCredential(credentialId: string): Promise<void> {
    await prisma.aIProviderCredential.delete({
      where: { id: credentialId },
    });
    aiCircuitBreaker.recordSuccess(credentialId);
  }
}

export const aiCredentialManager = new AICredentialManager();

