import { describe, it, expect } from 'vitest';
import {
  getAllUnifiedResearch,
  getUnifiedResearchBySlug,
  getLocalMdxResearch,
  mapSectorToCollection,
  getResearchSitemapEntries,
  getResearchSearchRecords,
  RESEARCH_COLLECTIONS,
} from '@/lib/research-content';

describe('Research Intelligence 2.0 — Canonical Discovery Layer', () => {
  it('loads local MDX research reports with calculated word counts and pages', () => {
    const reports = getLocalMdxResearch();
    expect(reports.length).toBeGreaterThanOrEqual(10);

    const qCommerce = reports.find((r) => r.slug === 'india-quick-commerce-2026');
    expect(qCommerce).toBeDefined();
    expect(qCommerce?.title).toContain('Quick Commerce');
    expect(qCommerce?.wordCount).toBeGreaterThan(4000);
    expect(qCommerce?.estimatedPages).toBeGreaterThanOrEqual(10);
    expect(qCommerce?.reviewStatus).toBe('Quantitative Model Verified');
    expect(qCommerce?.collectionSlug).toBe('quick-commerce');
  });

  it('maps various sector names to standardized editorial collections', () => {
    expect(mapSectorToCollection('Quick Commerce & Logistics')).toBe('quick-commerce');
    expect(mapSectorToCollection('Semiconductors & Deep Tech')).toBe('semiconductors');
    expect(mapSectorToCollection('Defence & Aerospace Indigenisation')).toBe('defence-aerospace');
    expect(mapSectorToCollection('Fintech Lending & Underwriting')).toBe('fintech-payments');
    expect(mapSectorToCollection('Electric Mobility & Battery Economics')).toBe('mobility-ev');
    expect(mapSectorToCollection('Renewable Energy & Green Hydrogen')).toBe('energy-climate');
    expect(mapSectorToCollection('Data Centers & AI Infrastructure')).toBe('tech-ai');
    expect(mapSectorToCollection('Private Credit & Direct Lending')).toBe('private-markets');
    expect(mapSectorToCollection('Global Macro & Rates')).toBe('macro-economy');
  });

  it('contains 11 curated collections with valid titles, descriptions and icons', () => {
    const keys = Object.keys(RESEARCH_COLLECTIONS);
    expect(keys.length).toBe(11);
    expect(RESEARCH_COLLECTIONS['quick-commerce'].title).toBe('Quick Commerce & Consumer Internet');
    expect(RESEARCH_COLLECTIONS['semiconductors'].title).toBe('Semiconductors & Deep Tech');
  });

  it('fetches a report by slug and returns null for invalid slugs', async () => {
    const valid = await getUnifiedResearchBySlug('india-quick-commerce-2026');
    expect(valid).not.toBeNull();
    expect(valid?.slug).toBe('india-quick-commerce-2026');
    expect(valid?.isPublished).toBe(true);

    const invalid = await getUnifiedResearchBySlug('nonexistent-report-slug-12345');
    expect(invalid).toBeNull();
  });

  it('generates valid XML sitemap entries for all published research', async () => {
    const sitemapEntries = await getResearchSitemapEntries();
    expect(sitemapEntries.length).toBeGreaterThanOrEqual(10);
    for (const entry of sitemapEntries) {
      expect(entry.url).toMatch(/^https:\/\/kunwaranalytics\.in\/research\/[a-z0-9-]+$/);
      expect(entry.priority).toBe(0.8);
      expect(entry.changeFrequency).toBe('monthly');
      expect(entry.lastModified).toBeInstanceOf(Date);
    }
  });

  it('generates deduplicated search records with unique objectIDs', async () => {
    const records = await getResearchSearchRecords();
    expect(records.length).toBeGreaterThanOrEqual(10);

    const idSet = new Set(records.map((r) => r.objectID));
    expect(idSet.size).toBe(records.length);

    for (const rec of records) {
      expect(rec.objectID).toBe(`research-${rec.slug}`);
      expect(rec.type).toBe('research');
      expect(rec.url).toBe(`/research/${rec.slug}`);
      expect(rec.title.length).toBeGreaterThan(5);
    }
  });
});

