interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeader({ label, title, subtitle, align = 'left', light = false }: SectionHeaderProps) {
  const containerClass = align === 'center' ? 'text-center' : '';
  const labelClass = light ? 'text-teal-300' : 'text-brand-teal';
  const titleClass = light ? 'text-white' : 'text-brand-navy';
  const subtitleClass = light ? 'text-gray-300' : 'text-brand-slate';
  const subtitleContainerClass = align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl';

  return (
    <div className={containerClass}>
      <p className={`section-label mb-2 ${labelClass}`}>{label}</p>
      <h2 className={`text-3xl md:text-4xl font-bold leading-snug ${titleClass}`}>{title}</h2>
      {subtitle && (
        <p className={`${subtitleClass} mt-4 ${subtitleContainerClass}`}>{subtitle}</p>
      )}
    </div>
  );
}