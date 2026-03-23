// FILE: components/ui/CTAButton.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'white' | 'outline-white';
  external?: boolean;
  className?: string;
}

export default function CTAButton({ href, children, variant = 'primary', external = false, className = '' }: CTAButtonProps) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const classes = `${baseClass} ${variantClass} ${className}`.trim();

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}