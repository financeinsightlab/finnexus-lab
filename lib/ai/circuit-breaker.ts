// lib/ai/circuit-breaker.ts — Resilience and Circuit Breaker for AI Endpoints

import type { AICircuitRecord, AICircuitState } from './types';

const FAILURE_THRESHOLD = 3;
const RESET_TIMEOUT_MS = 45_000; // 45 seconds before testing half-open

class AICircuitBreaker {
  private circuits = new Map<string, AICircuitRecord>();

  private getRecord(id: string): AICircuitRecord {
    let record = this.circuits.get(id);
    if (!record) {
      record = { state: 'CLOSED', failures: 0 };
      this.circuits.set(id, record);
    }
    return record;
  }

  canAttempt(id: string): boolean {
    const record = this.getRecord(id);
    const now = Date.now();

    if (record.state === 'CLOSED') {
      return true;
    }

    if (record.state === 'OPEN') {
      if (record.nextAttemptAt && now >= record.nextAttemptAt) {
        record.state = 'HALF_OPEN';
        return true;
      }
      return false;
    }

    if (record.state === 'HALF_OPEN') {
      // In half-open, allow one trial attempt
      return true;
    }

    return true;
  }

  recordSuccess(id: string): void {
    const record = this.getRecord(id);
    record.state = 'CLOSED';
    record.failures = 0;
    delete record.lastFailureAt;
    delete record.nextAttemptAt;
  }

  recordFailure(id: string): void {
    const record = this.getRecord(id);
    const now = Date.now();
    record.failures += 1;
    record.lastFailureAt = now;

    if (record.failures >= FAILURE_THRESHOLD || record.state === 'HALF_OPEN') {
      record.state = 'OPEN';
      record.nextAttemptAt = now + RESET_TIMEOUT_MS;
    }
  }

  getState(id: string): { state: AICircuitState; failures: number; cooldownRemainingMs: number } {
    const record = this.getRecord(id);
    const now = Date.now();
    let cooldown = 0;
    if (record.state === 'OPEN' && record.nextAttemptAt && record.nextAttemptAt > now) {
      cooldown = record.nextAttemptAt - now;
    }
    return {
      state: record.state,
      failures: record.failures,
      cooldownRemainingMs: cooldown,
    };
  }

  resetAll(): void {
    this.circuits.clear();
  }
}

export const aiCircuitBreaker = new AICircuitBreaker();

