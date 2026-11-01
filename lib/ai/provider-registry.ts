// lib/ai/provider-registry.ts — Provider Adapter Registry

import 'server-only';
import type { AIProviderAdapter, AIProviderId } from './types';
import { geminiAdapter } from './providers/gemini';
import { groqAdapter } from './providers/groq';

class AIProviderRegistry {
  private adapters = new Map<AIProviderId, AIProviderAdapter>();

  constructor() {
    this.register(geminiAdapter);
    this.register(groqAdapter);
  }

  register(adapter: AIProviderAdapter): void {
    this.adapters.set(adapter.id, adapter);
  }

  get(providerId: AIProviderId | string): AIProviderAdapter | undefined {
    return this.adapters.get(providerId as AIProviderId);
  }

  getAll(): AIProviderAdapter[] {
    return Array.from(this.adapters.values());
  }

  has(providerId: AIProviderId | string): boolean {
    return this.adapters.has(providerId as AIProviderId);
  }
}

export const aiProviderRegistry = new AIProviderRegistry();

