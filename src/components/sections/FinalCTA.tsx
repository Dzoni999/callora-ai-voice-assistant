import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { Button } from '@/components/Button';
import { fadeUp, staggerParent, viewportOnce } from '@/lib/motion';

interface FinalCTAProps {
  onBookDemo: () => void;
}

export function FinalCTA({ onBookDemo }: FinalCTAProps) {
  return (
    <section className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-[2rem] bg-ink-900 px-6 py-16 text-center shadow-soft-lg sm:px-12 sm:py-20 dark:bg-[#11161f]"
        >
          {/* glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-electric-500/30 blur-3xl" />
            <div className="absolute inset-0 bg-grid-faint bg-[size:40px_40px] opacity-20 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-ink-200 backdrop-blur"
            >
              <PhoneCall className="h-3.5 w-3.5 text-electric-400" />
              Your next caller is one ring away
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-6 text-3xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white"
            >
              Let AI answer your next customer call.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-lg text-ink-300"
            >
              See Callora in action on your own business — a 20-minute demo, no commitment.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                variant="dark"
                onClick={onBookDemo}
                iconRight={<ArrowRight className="h-4 w-4" />}
              >
                Book Your Free Demo
              </Button>
              <span className="text-sm text-ink-400">No credit card · Cancel anytime</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
