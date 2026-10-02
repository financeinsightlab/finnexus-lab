import { describe, expect, it } from 'vitest';
import { toPublicPredictionAuthor } from './public-prediction-author';

describe('toPublicPredictionAuthor', () => {
  it('redacts a private or missing profile and suppresses role badges', () => {
    expect(toPublicPredictionAuthor({
      id: 'user-private',
      name: 'Private Name',
      role: 'ADMIN',
      customBadge: 'Special Staff Badge',
      profile: { isPublic: false },
    })).toEqual({
      id: 'private',
      name: 'Private analyst',
      role: 'MEMBER',
      customBadge: null,
    });

    expect(toPublicPredictionAuthor({
      id: 'user-no-profile',
      name: 'No Profile Name',
      role: 'ANALYST',
      customBadge: null,
    })).toEqual({
      id: 'private',
      name: 'Private analyst',
      role: 'MEMBER',
      customBadge: null,
    });
  });

  it('keeps only the intended public author fields for a public profile', () => {
    expect(toPublicPredictionAuthor({
      id: 'user-public',
      name: 'Public Analyst',
      role: 'ANALYST',
      customBadge: 'Verified',
      profile: { isPublic: true },
    })).toEqual({
      id: 'user-public',
      name: 'Public Analyst',
      role: 'ANALYST',
      customBadge: 'Verified',
    });
  });
});
