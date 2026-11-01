// lib/ai/types.ts — Central AI Gateway Types and Contracts

export type AIProviderId = 'gemini' | 'groq';

export type AITaskId =
  | 'ask-kunwar'
  | 'company-intelligence'
  | 'placement'
  | 'research'
  | 'learning';

export interface AIChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AICompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  responseFormat?: 'text' | 'json';
  jsonSchema?: Record<string, unknown>;
  signal?: AbortSignal;
  userIdentifier?: string;
}

export interface AICompletionResponse {
  text: string;
  provider: AIProviderId;
  model: string;
  credentialId?: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
  latencyMs: number;
  fallbackUsed: boolean;
  raw?: unknown;
}

export interface AICredentialDecrypted {
  id: string;
  providerId: AIProviderId;
  label: string;
  apiKey: string;
  maskedKey: string;
  priority: number;
  enabled: boolean;
  status: string;
  cooldownUntil?: Date | null;
  requestLimitPerMinute?: number | null;
}

export interface AIProviderAdapter {
  id: AIProviderId;
  name: string;
  defaultModel: string;
  supportedModels: string[];
  chatCompletion(
    messages: AIChatMessage[],
    options: AICompletionOptions,
    credential: AICredentialDecrypted
  ): Promise<AICompletionResponse>;
  testConnection(credential: AICredentialDecrypted, model?: string): Promise<{ success: boolean; latencyMs: number; error?: string }>;
}

export interface AITaskRouteConfig {
  taskKey: AITaskId;
  name: string;
  description?: string;
  primaryProvider: AIProviderId;
  primaryModel: string;
  fallbackProvider?: AIProviderId | null;
  fallbackModel?: string | null;
  enabled: boolean;
  temperature: number;
  maxTokens: number;
}

export type AICircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export interface AICircuitRecord {
  state: AICircuitState;
  failures: number;
  lastFailureAt?: number;
  nextAttemptAt?: number;
}

