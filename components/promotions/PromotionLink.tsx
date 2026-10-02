'use client';

import type { MouseEvent, ReactNode } from 'react';
import { sendPromotionEvent } from '@/components/promotions/beacon';

export default function PromotionLink({
  promotionId,
  path,
  slot,
  href,
  children,
  className,
  target = '_blank',
  preview = false,
}: {
  promotionId: string;
  path: string;
  slot?: string | null;
  href: string;
  children: ReactNode;
  className: string;
  target?: '_blank' | '_self';
  /** Admin preview: never records clicks. */
  preview?: boolean;
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (preview) {
      event.preventDefault();
      return;
    }
    if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      sendPromotionEvent({ promotionId, eventType: 'CLICK', path, slot });
    }
  };

  return (
    <a
      href={href}
      target={target}
      rel="sponsored nofollow noopener noreferrer"
      onClick={handleClick}
      className={className}
      data-promotion-link={promotionId}
    >
      {children}
    </a>
  );
}
