interface TagProps {
  text: string;
  variant?: 'teal' | 'navy' | 'gold' | 'green' | 'silver' | 'red';
  className?: string;
}

export default function Tag({ text, variant = 'teal', className = '' }: TagProps) {
  return (
    <span className={`tag tag-${variant} ${className}`.trim()}>
      {text}
    </span>
  );
}