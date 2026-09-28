import { describe, expect, it } from 'vitest';
import {
    DATA_LAB_VISUALS,
    datasetColumns,
    datasetJsonLd,
    datasetToCsv,
    getDataset,
    listDatasetSlugs,
    type DatasetRow,
} from '@/lib/datasets';

const ROWS: DatasetRow[] = [
    { a: 1, b: 'plain', c: null },
    { a: 2, b: 'has,comma', c: 3 },
    { a: 3, b: 'has "quote"', c: 4 },
];

describe('datasetColumns', () => {
    it('returns the ordered union of keys across rows', () => {
        const rows: DatasetRow[] = [{ a: 1 }, { b: 2, a: 3 }, { c: 4 }];
        expect(datasetColumns(rows)).toEqual(['a', 'b', 'c']);
    });

    it('returns an empty array for no rows', () => {
        expect(datasetColumns([])).toEqual([]);
    });
});

describe('datasetToCsv', () => {
    it('emits a header and one line per row', () => {
        const csv = datasetToCsv(ROWS, ['a', 'b', 'c']);
        const lines = csv.split('\n');
        expect(lines[0]).toBe('a,b,c');
        expect(lines).toHaveLength(4);
    });

    it('quotes fields containing commas, quotes and handles nulls', () => {
        const csv = datasetToCsv(ROWS, ['a', 'b', 'c']);
        // null → empty
        expect(csv).toContain('1,plain,');
        // comma → wrapped in quotes
        expect(csv).toContain('2,"has,comma",3');
        // embedded quotes → doubled inside quotes
        expect(csv).toContain('3,"has ""quote""",4');
    });

    it('infers columns when none are provided', () => {
        const csv = datasetToCsv([{ x: '1', y: '2' }]);
        expect(csv).toBe('x,y\n1,2');
    });
});

describe('getDataset', () => {
    it('returns null for an unknown slug', () => {
        expect(getDataset('does-not-exist')).toBeNull();
    });

    it('resolves a known dataset with columns, rows and machine-readable urls', () => {
        const dataset = getDataset('qcommerce-unit-economics-model');
        expect(dataset).not.toBeNull();
        expect(dataset?.rowCount).toBeGreaterThan(0);
        expect(dataset?.columns).toContain('orders_per_day');
        expect(dataset?.csvUrl).toContain('/api/datasets/qcommerce-unit-economics-model?format=csv');
        expect(dataset?.jsonUrl).toContain('format=json');
        expect(dataset?.pageUrl).toContain('/data-lab/qcommerce-unit-economics-model');
    });
});

describe('listDatasetSlugs', () => {
    it('exposes every visual dataset', () => {
        expect(listDatasetSlugs().sort()).toEqual(Object.keys(DATA_LAB_VISUALS).sort());
        expect(listDatasetSlugs().length).toBeGreaterThanOrEqual(7);
    });
});

describe('datasetJsonLd', () => {
    const project = {
        slug: 'qcommerce-unit-economics-model',
        title: 'Quick Commerce Unit Economics',
        businessQuestion: 'When does a dark store turn CM2 positive?',
        date: '2026-01-01',
        tools: ['Excel'],
        sector: 'Quick Commerce',
    };

    it('emits a schema.org Dataset with distribution and variableMeasured', () => {
        const jsonLd = datasetJsonLd(project, DATA_LAB_VISUALS[project.slug]);
        expect(jsonLd['@type']).toBe('Dataset');
        expect(jsonLd.name).toBe(project.title);
        expect(jsonLd.isAccessibleForFree).toBe(true);
        expect(jsonLd.license).toContain('creativecommons.org');
        expect(Array.isArray(jsonLd.distribution)).toBe(true);
        expect(Array.isArray(jsonLd.variableMeasured)).toBe(true);
        expect((jsonLd.variableMeasured as unknown[]).length).toBeGreaterThan(0);
    });

    it('still produces a valid Dataset when no visual is available', () => {
        const jsonLd = datasetJsonLd(project, undefined);
        expect(jsonLd['@type']).toBe('Dataset');
        expect(jsonLd.distribution).toBeUndefined();
        expect(jsonLd.variableMeasured).toBeUndefined();
    });
});
