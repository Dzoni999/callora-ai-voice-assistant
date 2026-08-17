import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'framer-motion';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
}

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-500/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary:
    'bg-ink-900 text-white hover:bg-ink-800 shadow-soft hover:shadow-glow hover:-translate-y-0.5 dark:bg-white dark:text-ink-900 dark:hover:bg-ink-100',
  secondary:
    'bg-white text-ink-900 border border-ink-200 hover:border-ink-300 hover:bg-ink-50 shadow-soft hover:-translate-y-0.5 dark:bg-white/5 dark:text-white dark:border-white/15 dark:hover:bg-white/10 dark:hover:border-white/25',
  ghost: 'text-ink-700 hover:text-ink-900 hover:bg-ink-100/70 dark:text-ink-300 dark:hover:text-white dark:hover:bg-white/10',
  dark: 'bg-electric-600 text-white hover:bg-electric-500 shadow-glow hover:-translate-y-0.5',
};

const sizes: Record<Size, string> = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-7 py-3.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...(props as any)}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && (
        <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
          {iconRight}
        </span>
      )}
    </motion.button>
  );
}
