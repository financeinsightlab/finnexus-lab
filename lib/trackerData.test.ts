import { describe, expect, it } from 'vitest';
import { getHeatMapData, shortLabel } from './trackerData';
import { TRACKERS } from './trackerData.data';

describe('tracker snapshot projections', () => {
  it('uses the selected quarter for both the card headline and trend data', () => {
    const quarterKey = 'Q2-2026';
    const selected = getHeatMapData(quarterKey);

    for (const item of selected) {
      const tracker = TRACKERS.find((candidate) => candidate.slug === item.slug);
      expect(tracker).toBeDefined();
      expect(item.latest).toEqual(tracker?.quarters[quarterKey]);
    }
  });

  it('uses neutral site-indicator labels rather than implying market consensus', () => {
    expect(shortLabel('CONSENSUS BULL')).toBe('High indicator');
    expect(shortLabel('EXTREME BEAR — contrarian caution')).toBe('Low indicator');
    expect(shortLabel('MIXED SIGNALS')).toBe('Mid-range indicator');
  });
});
