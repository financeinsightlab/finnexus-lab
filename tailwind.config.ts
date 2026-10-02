import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './pages/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        serif: ['var(--font-serif)', 'Source Serif 4', 'serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
        display: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      colors: {
        /* Semantic tokens keep CMS/public product surfaces readable in both themes. */
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        card: 'hsl(var(--card) / <alpha-value>)',
        'card-foreground': 'hsl(var(--card-foreground) / <alpha-value>)',
        popover: 'hsl(var(--popover) / <alpha-value>)',
        'popover-foreground': 'hsl(var(--popover-foreground) / <alpha-value>)',
        primary: 'hsl(var(--primary) / <alpha-value>)',
        'primary-foreground': 'hsl(var(--primary-foreground) / <alpha-value>)',
        secondary: 'hsl(var(--secondary) / <alpha-value>)',
        'secondary-foreground': 'hsl(var(--secondary-foreground) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        'muted-foreground': 'hsl(var(--muted-foreground) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        'accent-foreground': 'hsl(var(--accent-foreground) / <alpha-value>)',
        destructive: 'hsl(var(--destructive) / <alpha-value>)',
        'destructive-foreground': 'hsl(var(--destructive-foreground) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        /* Semantic surface, content, border, interaction, and status tokens. */
        surface: 'hsl(var(--surface) / <alpha-value>)',
        'surface-raised': 'hsl(var(--surface-raised) / <alpha-value>)',
        'surface-muted': 'hsl(var(--surface-muted) / <alpha-value>)',
        'surface-overlay': 'hsl(var(--surface-overlay) / <alpha-value>)',
        'content-primary': 'hsl(var(--content-primary) / <alpha-value>)',
        'content-secondary': 'hsl(var(--content-secondary) / <alpha-value>)',
        'content-muted': 'hsl(var(--content-muted) / <alpha-value>)',
        'content-disabled': 'hsl(var(--content-disabled) / <alpha-value>)',
        'content-inverse': 'hsl(var(--content-inverse) / <alpha-value>)',
        'border-subtle': 'hsl(var(--border-subtle) / <alpha-value>)',
        'border-strong': 'hsl(var(--border-strong) / <alpha-value>)',
        'border-focus': 'hsl(var(--border-focus) / <alpha-value>)',
        'primary-hover': 'hsl(var(--primary-hover) / <alpha-value>)',
        'secondary-hover': 'hsl(var(--secondary-hover) / <alpha-value>)',
        'destructive-hover': 'hsl(var(--destructive-hover) / <alpha-value>)',
        brand: 'hsl(var(--brand) / <alpha-value>)',
        'brand-hover': 'hsl(var(--brand-hover) / <alpha-value>)',
        'brand-muted': 'hsl(var(--brand-muted) / <alpha-value>)',
        'accent-muted': 'hsl(var(--accent-muted) / <alpha-value>)',
        success: 'hsl(var(--success) / <alpha-value>)',
        'success-muted': 'hsl(var(--success-muted) / <alpha-value>)',
        warning: 'hsl(var(--warning) / <alpha-value>)',
        'warning-muted': 'hsl(var(--warning-muted) / <alpha-value>)',
        error: 'hsl(var(--error) / <alpha-value>)',
        'error-muted': 'hsl(var(--error-muted) / <alpha-value>)',
        info: 'hsl(var(--info) / <alpha-value>)',
        'info-muted': 'hsl(var(--info-muted) / <alpha-value>)',
        'accent-violet': 'hsl(var(--accent-violet) / <alpha-value>)',
        'accent-violet-muted': 'hsl(var(--accent-violet-muted) / <alpha-value>)',
        /* ── Legacy brand colors (kept for compatibility) ── */
        'brand-navy': '#1A2B3C',
        'brand-slate': 'hsl(var(--content-secondary) / <alpha-value>)',
        'brand-teal': 'hsl(var(--brand) / <alpha-value>)',
        'brand-gold': 'hsl(var(--warning) / <alpha-value>)',
        'brand-green': 'hsl(var(--success) / <alpha-value>)',
        'brand-red': 'hsl(var(--error) / <alpha-value>)',
        'brand-silver': '#EEF2F7',
        'brand-cream': '#FAFAF8',

        /* ── Cinematic luxury palette ── */
        'cinema-black': '#050507',
        'cinema-ink': '#0A0B0F',
        'cinema-charcoal': '#121419',
        'cinema-graphite': '#1A1D24',
        'cinema-slate': '#22262E',
        'cinema-steel': '#2D323B',
        'cinema-blue': '#0A1628',
        'cinema-deep-blue': '#0D1B2A',
        'cinema-mid-blue': '#1B2A4A',
        'cinema-glow-blue': '#3B82F6',
        'cinema-cyan': '#06B6D4',
        'cinema-violet': '#7C3AED',
        'cinema-aurora': '#10B981',
        'cinema-amber': '#F59E0B',
      },
      maxWidth: {
        content: '1280px',
        prose: '680px',
      },
      /* ── Cinematic depth shadows ── */
      boxShadow: {
        'depth-1': '0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
        'depth-2': '0 2px 4px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.08)',
        'depth-3': '0 4px 8px rgba(0,0,0,0.04), 0 12px 28px rgba(0,0,0,0.12)',
        'depth-4': '0 8px 16px rgba(0,0,0,0.05), 0 24px 48px rgba(0,0,0,0.16)',
        'glow-teal': '0 0 24px rgba(13,110,110,0.35), 0 0 48px rgba(13,110,110,0.15)',
        'glow-gold': '0 0 24px rgba(146,98,10,0.35), 0 0 48px rgba(146,98,10,0.15)',
        'inner-highlight': 'inset 0 1px 0 rgba(255,255,255,0.15)',
        /* Cinematic */
        'cinema-sm': '0 2px 8px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.6)',
        'cinema-md': '0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)',
        'cinema-lg': '0 24px 64px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)',
        'cinema-xl': '0 48px 128px rgba(0,0,0,0.7), 0 16px 48px rgba(0,0,0,0.5)',
        'glow-blue': '0 0 32px rgba(59,130,246,0.4), 0 0 64px rgba(59,130,246,0.2)',
        'glow-cyan': '0 0 32px rgba(6,182,212,0.4), 0 0 64px rgba(6,182,212,0.2)',
        'glow-violet': '0 0 32px rgba(124,58,237,0.4), 0 0 64px rgba(124,58,237,0.2)',
        'glow-aurora': '0 0 32px rgba(16,185,129,0.4), 0 0 64px rgba(16,185,129,0.2)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 24px rgba(59,130,246,0.05)',
      },
      /* ── Cinematic animations ── */
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        aurora: 'aurora 20s ease infinite',
        'shimmer-3d': 'shimmer3d 3s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        /* Cinematic */
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-scale': 'fadeScale 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-in': 'slideIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'light-sweep': 'lightSweep 3s ease-in-out infinite',
        'border-glow': 'borderGlow 4s ease-in-out infinite',
        'mesh-drift': 'meshDrift 25s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.5s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer-text': 'shimmerText 4s linear infinite',
        'gradient-pan': 'gradientPan 6s ease infinite',
      },
      /* ── Keyframes ── */
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%,100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        gradientShift: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        aurora: {
          '0%,100%': { transform: 'translate(0,0) rotate(0deg) scale(1)' },
          '33%': { transform: 'translate(30px,-20px) rotate(120deg) scale(1.1)' },
          '66%': { transform: 'translate(-20px,20px) rotate(240deg) scale(0.95)' },
        },
        shimmer3d: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        /* Cinematic */
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeScale: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        lightSweep: {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
        borderGlow: {
          '0%,100%': { boxShadow: '0 0 20px rgba(59,130,246,0.2), inset 0 0 20px rgba(59,130,246,0.05)' },
          '50%': { boxShadow: '0 0 40px rgba(59,130,246,0.4), inset 0 0 30px rgba(59,130,246,0.1)' },
        },
        meshDrift: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '25%': { transform: 'translate(3%,-2%) scale(1.05)' },
          '50%': { transform: 'translate(-2%,3%) scale(0.98)' },
          '75%': { transform: 'translate(-3%,-1%) scale(1.03)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        shimmerText: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        gradientPan: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      /* ── Perspective & Transform ── */
      perspective: {
        '500': '500px',
        '1000': '1000px',
        '1500': '1500px',
        '2000': '2000px',
      },
      transformOrigin: {
        center: 'center center',
      },
      /* ── Backdrop blur ── */
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
      /* ── Background image utilities ── */
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        'radial-fade': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid-sm': '40px 40px',
        'grid-md': '80px 80px',
      },
    },
  },
  plugins: [
    typography,
  ],
} satisfies Config