'use client';

import type { MouseEvent, ReactNode } from 'react';

export default function PromotionLink({
  promotionId,
  path,
  href,
  children,
  className,
  target = '_blank',
}: {
  promotionId: string;
  path: string;
  href: string;
  children: ReactNode;
  className: string;
  target?: '_blank' | '_self';
}) {
  const trackClick = () => {
    const payload = JSON.stringify({ promotionId, eventType: 'CLICK', path });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/promotions/event', new Blob([payload], { type: 'application/json' }));
    } else {
      fetch('/api/promotions/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => undefined);
    }
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) trackClick();
  };

  return (
    <a
      href={href}
      target={target}
      rel="sponsored nofollow noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
