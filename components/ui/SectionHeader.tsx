interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeader({ label, title, subtitle, align = 'left', light = false }: SectionHeaderProps) {
  const containerClass = align === 'center' ? 'text-center' : '';
  /* `light` used to mean "on a dark cinematic surface" and hard-coded dark-only
     colours. It now means "on a decorative band" and adapts to the active theme. */
  const labelClass = light ? 'text-teal-700 dark:text-cinema-cyan' : 'text-brand-teal';
  const titleClass = light ? 'text-slate-900 dark:text-white' : 'text-brand-navy dark:text-slate-100';
  const subtitleClass = light ? 'text-slate-600 dark:text-gray-300' : 'text-brand-slate dark:text-slate-300';
  const subtitleContainerClass = align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl';

  return (
    <div className={containerClass}>
      <p className={`section-label mb-2 ${labelClass} animate-glow-pulse`}>{label}</p>
      <h2 className={`text-3xl md:text-4xl font-bold leading-snug ${titleClass} drop-shadow-sm`}>{title}</h2>
      {subtitle && (
        <p className={`${subtitleClass} mt-4 ${subtitleContainerClass}`}>{subtitle}</p>
      )}
    </div>
  );
}