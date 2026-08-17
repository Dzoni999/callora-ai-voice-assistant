import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerParent, viewportOnce } from '@/lib/motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerParent}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'} ${className}`}
    >
      {eyebrow && (
        <motion.p variants={fadeUp} className="eyebrow mb-4">
          <span className="h-px w-6 bg-electric-500/60" />
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-gradient leading-[1.1]"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className={`mt-5 text-base sm:text-lg text-ink-500 leading-relaxed dark:text-ink-400 ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
