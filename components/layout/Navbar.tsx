'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Research', href: '/research' },
  { label: 'Insights', href: '/insights' },
  { label: 'Tools', href: '/tools' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Enterprise', href: '/enterprise' },
  { label: 'Tracker', href: '/tracker' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSolid(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const isHome = pathname === '/';
  const logoTextClass = isSolid ? 'text-brand-navy' : isHome ? 'text-white' : 'text-brand-navy';
  const labTextClass = isSolid ? 'text-brand-teal' : isHome ? 'text-brand-gold' : 'text-brand-teal';

  const headerClasses = [
    'fixed top-0 inset-x-0 z-50 transition-all duration-300',
    isSolid
      ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
      : 'bg-transparent border-b border-transparent',
  ].join(' ');

  const linkClasses = (href: string) => {
    const base = 'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors';
    if (isActive(href)) return `${base} text-brand-teal bg-teal-50`;
    if (isSolid) return `${base} text-brand-slate hover:text-brand-navy hover:bg-gray-50`;
    return `${base} text-white/80 hover:text-white hover:bg-white/10`;
  };

  const mobileLinkClasses = (href: string) => {
    const base = 'block px-4 py-3 text-base font-medium transition-colors';
    if (isActive(href)) return `${base} text-brand-teal`;
    return `${base} text-brand-slate hover:text-brand-navy`;
  };

  return (
    <header className={headerClasses}>
      <nav className="wrap flex items-center justify-between h-16">
        <Link href="/" className="flex items-center space-x-1 font-bold text-lg">
          <span className={logoTextClass}>FinNexus</span>
          <span className={labTextClass}>Lab</span>
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClasses(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/resume" className="text-sm font-medium text-brand-slate hover:text-brand-navy transition-colors">
            Resume
          </Link>
          <Link href="/contact" className="btn btn-primary">
            Work With Me
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col space-y-1 p-2"
          aria-label="Toggle menu"
        >
          <div
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <div
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <div
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        } bg-white border-t border-gray-100 shadow-lg`}
      >
        <div className="flex flex-col space-y-1 p-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={mobileLinkClasses(link.href)}>
              {link.label}
            </Link>
          ))}
          <Link href="/resume" className="block px-4 py-3 text-base font-medium text-brand-slate hover:text-brand-navy transition-colors">
            Resume
          </Link>
          <Link href="/contact" className="btn btn-primary mt-4">
            Work With Me
          </Link>
        </div>
      </div>
    </header>
  );
}