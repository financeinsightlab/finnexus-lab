// tests/ai-platform.test.ts — Comprehensive Unit & Integration Tests for Central AI Platform

import { describe, it, expect, beforeEach } from 'vitest';
import {
  encryptSecret,
  decryptSecret,
  maskApiKey,
} from '@/lib/ai/credential-encryption';
import { aiCircuitBreaker } from '@/lib/ai/circuit-breaker';
import { validateCitations } from '@/lib/knowledge/citation-validator';
import { chunkDocument } from '@/lib/knowledge/chunker';
import { parseTextDocument } from '@/lib/knowledge/document-parser';
import { setGlobalAiKillSwitch, isGlobalAiKillSwitchActive } from '@/lib/ai/gateway';

describe('AI Credential Encryption (AES-256-GCM)', () => {
  it('encrypts and decrypts a raw API key successfully', () => {
    const rawKey = 'gsk_test_api_key_1234567890abcdefghijklmnopqrstuvwxyz';
    const encrypted = encryptSecret(rawKey);

    expect(encrypted.ciphertext).toBeDefined();
    expect(encrypted.nonce).toHaveLength(24); // 12 bytes = 24 hex chars
    expect(encrypted.authTag).toHaveLength(32); // 16 bytes = 32 hex chars
    expect(encrypted.keyVersion).toBe(1);

    const decrypted = decryptSecret({
      ciphertext: encrypted.ciphertext,
      nonce: encrypted.nonce,
      authTag: encrypted.authTag,
      keyVersion: encrypted.keyVersion,
    });

    expect(decrypted).toBe(rawKey);
  });

  it('fails decryption when ciphertext is tampered with', () => {
    const rawKey = 'AIzaSyA_test_google_gemini_key_1234567890';
    const encrypted = encryptSecret(rawKey);

    // Tamper with ciphertext by altering last char
    const tamperedCiphertext =
      encrypted.ciphertext.slice(0, -2) + (encrypted.ciphertext.slice(-2) === 'aa' ? 'bb' : 'aa');

    expect(() => {
      decryptSecret({
        ciphertext: tamperedCiphertext,
        nonce: encrypted.nonce,
        authTag: encrypted.authTag,
      });
    }).toThrow();
  });

  it('fails decryption when authentication tag is invalid', () => {
    const rawKey = 'AIzaSyA_test_google_gemini_key_1234567890';
    const encrypted = encryptSecret(rawKey);

    expect(() => {
      decryptSecret({
        ciphertext: encrypted.ciphertext,
        nonce: encrypted.nonce,
        authTag: '00000000000000000000000000000000',
      });
    }).toThrow();
  });

  it('masks sensitive API keys with prefix preservation and hidden body', () => {
    expect(maskApiKey('gsk_1234567890abcdef')).toMatch(/^gsk_•+cdef$/);
    expect(maskApiKey('AIzaSyA1234567890BC')).toMatch(/^AIza•+90BC$/);
    expect(maskApiKey('sk-1234567890')).toMatch(/^sk-•+7890$/);
    expect(maskApiKey('')).toBe('••••••••');
  });
});

describe('AI Circuit Breaker', () => {
  const testId = 'cred-test-circuit-1';

  beforeEach(() => {
    aiCircuitBreaker.resetAll();
  });

  it('starts in CLOSED state and allows requests', () => {
    expect(aiCircuitBreaker.canAttempt(testId)).toBe(true);
    expect(aiCircuitBreaker.getState(testId).state).toBe('CLOSED');
  });

  it('trips to OPEN state after 3 consecutive failures', () => {
    aiCircuitBreaker.recordFailure(testId);
    expect(aiCircuitBreaker.canAttempt(testId)).toBe(true);

    aiCircuitBreaker.recordFailure(testId);
    expect(aiCircuitBreaker.canAttempt(testId)).toBe(true);

    aiCircuitBreaker.recordFailure(testId);
    // 3rd failure trips the circuit
    expect(aiCircuitBreaker.canAttempt(testId)).toBe(false);
    expect(aiCircuitBreaker.getState(testId).state).toBe('OPEN');
    expect(aiCircuitBreaker.getState(testId).cooldownRemainingMs).toBeGreaterThan(0);
  });

  it('resets to CLOSED state on recorded success', () => {
    aiCircuitBreaker.recordFailure(testId);
    aiCircuitBreaker.recordFailure(testId);
    aiCircuitBreaker.recordSuccess(testId);

    expect(aiCircuitBreaker.canAttempt(testId)).toBe(true);
    expect(aiCircuitBreaker.getState(testId).state).toBe('CLOSED');
    expect(aiCircuitBreaker.getState(testId).failures).toBe(0);
  });
});

describe('Citation Validator & Grounding Filter', () => {
  const passages = [
    {
      index: 1,
      title: 'DCF Valuation Model',
      url: '/tools/dcf-valuation-model',
      snippet: 'Discounted cash flow model using 5-year projections and WACC.',
      sourceType: 'WEBSITE',
    },
    {
      index: 2,
      title: 'Indian 10Y G-Sec Yield',
      url: '/markets',
      snippet: 'Indian benchmark sovereign bond yield currently trading around 6.82%.',
      sourceType: 'WEBSITE',
    },
  ];

  it('validates citations matching retrieved passages', () => {
    const rawAnswer = 'WACC requires the 10Y G-Sec yield [2] to compute the cost of equity for DCF models [1].';
    const result = validateCitations(rawAnswer, passages);

    expect(result.hasHallucinatedCitations).toBe(false);
    expect(result.citations).toHaveLength(2);
    expect(result.citations[0].index).toBe(1);
    expect(result.citations[1].index).toBe(2);
    expect(result.citations[0].title).toBe('DCF Valuation Model');
  });

  it('strips hallucinated citation numbers not present in passages', () => {
    const rawAnswer = 'According to unverified sources [99], the market rallied [1].';
    const result = validateCitations(rawAnswer, passages);

    expect(result.hasHallucinatedCitations).toBe(true);
    expect(result.citations).toHaveLength(1);
    expect(result.citations[0].index).toBe(1);
    expect(result.cleanAnswer).not.toContain('[99]');
    expect(result.cleanAnswer).toContain('[1]');
  });
});

describe('Document Chunker', () => {
  it('splits long markdown document by headings', () => {
    const markdown = `# Introduction
This is the intro section to Indian corporate finance.

## Capital Budgeting
Capital budgeting involves NPV, IRR, and payback period calculations.

## Cost of Capital
WACC is the weighted average cost of equity and debt.`;

    const chunks = chunkDocument('Corporate Finance Overview', markdown, { maxChunkLength: 300 });

    expect(chunks.length).toBeGreaterThanOrEqual(3);
    expect(chunks[0].title).toContain('Introduction');
    expect(chunks[1].title).toContain('Capital Budgeting');
    expect(chunks[2].title).toContain('Cost of Capital');
  });
});

describe('Document Parser', () => {
  it('parses CSV data into formatted structured text', () => {
    const csv = `Symbol,Price,PE,MarketCap\nRELIANCE,2950,24.5,2000000\nTCS,4150,28.2,1500000`;
    const parsed = parseTextDocument('nifty50_stocks.csv', csv);

    expect(parsed.title).toBe('nifty50 stocks');
    expect(parsed.text).toContain('CSV Document: nifty50 stocks');
    expect(parsed.text).toContain('RELIANCE');
    expect(parsed.metadata?.isCsv).toBe(true);
  });
});

describe('Global Emergency AI Kill-Switch', () => {
  beforeEach(() => {
    setGlobalAiKillSwitch(false);
  });

  it('defaults to inactive', () => {
    expect(isGlobalAiKillSwitchActive()).toBe(false);
  });

  it('activates and deactivates kill-switch immediately', () => {
    setGlobalAiKillSwitch(true);
    expect(isGlobalAiKillSwitchActive()).toBe(true);

    setGlobalAiKillSwitch(false);
    expect(isGlobalAiKillSwitchActive()).toBe(false);
  });
});

