// lib/ai/providers/gemini.ts — Google Gemini Provider Adapter
//
// Official API endpoint: https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent

import 'server-only';
import type {
  AIProviderAdapter,
  AIChatMessage,
  AICompletionOptions,
  AICompletionResponse,
  AICredentialDecrypted,
} from '../types';

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
    finishReason?: string;
  }>;
  usageMetadata?: {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
    totalTokenCount?: number;
  };
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
}

export class GeminiProviderAdapter implements AIProviderAdapter {
  id = 'gemini' as const;
  name = 'Google Gemini';
  defaultModel = 'gemini-2.0-flash';
  supportedModels = [
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-2.0-flash-lite-preview-02-05',
  ];

  async chatCompletion(
    messages: AIChatMessage[],
    options: AICompletionOptions,
    credential: AICredentialDecrypted
  ): Promise<AICompletionResponse> {
    const startTime = Date.now();
    const model = options.model || this.defaultModel;
    const url = `${BASE_URL}/${model}:generateContent?key=${encodeURIComponent(credential.apiKey)}`;

    // Separate system message from conversation contents
    const systemMessage = messages.find((m) => m.role === 'system');
    const conversationMessages = messages.filter((m) => m.role !== 'system');

    // Convert to Gemini format (roles: 'user' and 'model')
    const contents = conversationMessages.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // If contents empty, provide a minimal fallback user prompt
    if (contents.length === 0) {
      contents.push({ role: 'user', parts: [{ text: 'Please proceed.' }] });
    }

    const requestBody: Record<string, unknown> = {
      contents,
      generationConfig: {
        temperature: options.temperature ?? 0.3,
        maxOutputTokens: options.maxTokens ?? 1000,
        ...(options.responseFormat === 'json'
          ? { responseMimeType: 'application/json' }
          : {}),
      },
    };

    if (systemMessage) {
      requestBody.systemInstruction = {
        parts: [{ text: systemMessage.content }],
      };
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: options.signal ?? AbortSignal.timeout(25_000),
    });

    const latencyMs = Date.now() - startTime;

    if (!res.ok) {
      let errMessage = `HTTP ${res.status}`;
      try {
        const errJson = (await res.json()) as GeminiResponse;
        if (errJson.error?.message) {
          errMessage = `${errJson.error.status || res.status}: ${errJson.error.message}`;
        }
      } catch {
        // use default HTTP error
      }
      throw new Error(`Gemini API error (${errMessage})`);
    }

    const data = (await res.json()) as GeminiResponse;
    const firstCandidate = data.candidates?.[0];
    const text = firstCandidate?.content?.parts?.map((p) => p.text || '').join('') ?? '';

    if (!text.trim()) {
      throw new Error('Gemini returned an empty response candidate');
    }

    return {
      text: text.trim(),
      provider: 'gemini',
      model,
      credentialId: credential.id,
      usage: {
        promptTokens: data.usageMetadata?.promptTokenCount,
        completionTokens: data.usageMetadata?.candidatesTokenCount,
        totalTokens: data.usageMetadata?.totalTokenCount,
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
      const url = `${BASE_URL}/${model}:generateContent?key=${encodeURIComponent(credential.apiKey)}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: 'Ping test' }] }],
          generationConfig: { maxOutputTokens: 5 },
        }),
        signal: AbortSignal.timeout(10_000),
      });

      const latencyMs = Date.now() - startTime;

      if (!res.ok) {
        let errMsg = `HTTP ${res.status}`;
        try {
          const errData = (await res.json()) as GeminiResponse;
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

export const geminiAdapter = new GeminiProviderAdapter();

