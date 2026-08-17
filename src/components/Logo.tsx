interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { img: 'h-7 w-7', text: 'text-sm' },
  md: { img: 'h-9 w-9', text: 'text-[15px]' },
  lg: { img: 'h-11 w-11', text: 'text-lg' },
};

export function Logo({ className = '', showWordmark = true, size = 'md' }: LogoProps) {
  const { img, text } = sizeMap[size];
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/logo_callora.jpg"
        alt="Callora AI logo"
        className={`${img} rounded-xl object-cover ring-1 ring-black/5 dark:ring-white/10`}
      />
      {showWordmark && (
        <span className={`${text} font-semibold tracking-tight text-ink-900 dark:text-white`}>
          Callora <span className="text-electric-600 dark:text-electric-400">AI</span>
        </span>
      )}
    </span>
  );
}
