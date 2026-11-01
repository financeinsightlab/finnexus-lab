// lib/ai/index.ts — Public AI Gateway API

export * from './types';
export { aiGateway, AIGatewayError, setGlobalAiKillSwitch, isGlobalAiKillSwitchActive } from './gateway';
export { aiProviderRegistry } from './provider-registry';
export { aiCredentialManager } from './credential-manager';
export { aiRouter } from './router';
export { maskApiKey } from './credential-encryption';
export { aiCircuitBreaker } from './circuit-breaker';

