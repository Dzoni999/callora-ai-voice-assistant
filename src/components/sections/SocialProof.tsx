import { motion } from 'framer-motion';
import { Star, Building2 } from 'lucide-react';
import { fadeUp, staggerParent, viewportOnce } from '@/lib/motion';

const logos = ['Northwind', 'Lumina', 'Cedar & Co.', 'Vantage', 'Orchid', 'Meridian', 'Halcyon', 'Apex'];

export function SocialProof() {
  return (
    <section className="relative py-14 sm:py-16">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center gap-3 text-center"
        >
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <Stat icon={<Building2 className="h-4 w-4" />} value="250+" label="Trusted businesses" />
            <span className="hidden h-5 w-px bg-ink-200 sm:block dark:bg-white/15" />
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-ink-900 dark:text-white">4.9/5</span>
              <span className="text-sm text-ink-500 dark:text-ink-400">customer rating</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="mask-fade-x mt-10 overflow-hidden"
        >
          <div className="flex w-max animate-marquee items-center gap-12">
            {[...logos, ...logos].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-lg font-semibold tracking-tight text-ink-400 transition-colors hover:text-ink-600 dark:text-ink-500 dark:hover:text-ink-300"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-electric-600">{icon}</span>
      <span className="text-sm font-semibold text-ink-900 dark:text-white">{value}</span>
      <span className="text-sm text-ink-500 dark:text-ink-400">{label}</span>
    </div>
  );
}
