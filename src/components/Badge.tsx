import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function Badge({ children, icon, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-ink-200/80 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-ink-700 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-ink-200 ${className}`}
    >
      {icon && <span className="text-electric-600 dark:text-electric-400">{icon}</span>}
      {children}
    </span>
  );
}
