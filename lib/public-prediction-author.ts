export interface PredictionAuthorForPublicView {
  id: string;
  name: string | null;
  role: string;
  customBadge: string | null;
  profile?: { isPublic: boolean } | null;
}

export interface PublicPredictionAuthor {
  id: string;
  name: string | null;
  role: string;
  customBadge: string | null;
}

/** Keep private-profile identity and staff/analyst badges out of public prediction views. */
export function toPublicPredictionAuthor(author: PredictionAuthorForPublicView): PublicPredictionAuthor {
  if (author.profile?.isPublic !== true) {
    return {
      id: 'private',
      name: 'Private analyst',
      role: 'MEMBER',
      customBadge: null,
    };
  }

  return {
    id: author.id,
    name: author.name,
    role: author.role,
    customBadge: author.customBadge,
  };
}
