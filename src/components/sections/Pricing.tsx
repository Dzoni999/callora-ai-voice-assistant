import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { fadeUp, staggerParent, viewportOnce } from '@/lib/motion';

interface Plan {
  name: string;
  monthly: number | null;
  annual: number | null;
  tagline: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    monthly: 149,
    annual: 119,
    tagline: 'For solo operators getting started.',
    features: [
      '1 AI phone line',
      '200 minutes / month',
      'Appointment booking',
      'Call transcripts',
      'Email support',
    ],
    cta: 'Start with Starter',
  },
  {
    name: 'Pro',
    monthly: 399,
    annual: 319,
    tagline: 'For growing teams that can’t miss a call.',
    highlighted: true,
    features: [
      '3 AI phone lines',
      '1,000 minutes / month',
      'CRM & calendar integrations',
      'Live call transfers',
      'Analytics dashboard',
      'Priority support',
    ],
    cta: 'Book a Demo',
  },
  {
    name: 'Enterprise',
    monthly: null,
    annual: null,
    tagline: 'For multi-location and high-volume operations.',
    features: [
      'Unlimited phone lines',
      'Custom minute pools',
      'Dedicated voice model tuning',
      'SSO & audit logs',
      'SLA & onboarding manager',
    ],
    cta: 'Talk to sales',
  },
];

interface PricingProps {
  onBookDemo: () => void;
}

export function Pricing({ onBookDemo }: PricingProps) {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Pricing"
          title={<>Simple pricing that pays for itself.</>}
          description="One missed appointment usually costs more than a month of Callora. Start with a demo — no card required."
        />

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <span className={`text-sm font-medium transition-colors ${!annual ? 'text-ink-900 dark:text-white' : 'text-ink-400 dark:text-ink-500'}`}>Monthly</span>
          <button
            onClick={() => setAnnual((v) => !v)}
            className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${annual ? 'bg-electric-500' : 'bg-ink-200 dark:bg-white/15'}`}
            aria-label="Toggle billing period"
          >
            <motion.span
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-soft ${annual ? 'left-6' : 'left-1'}`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${annual ? 'text-ink-900 dark:text-white' : 'text-ink-400 dark:text-ink-500'}`}>
            Annual
            <span className="ml-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-2xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">Save 20%</span>
          </span>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-12 grid max-w-5xl items-center gap-5 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} annual={annual} onBookDemo={onBookDemo} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PlanCard({ plan, annual, onBookDemo }: { plan: Plan; annual: boolean; onBookDemo: () => void }) {
  const highlighted = plan.highlighted;
  const price = annual ? plan.annual : plan.monthly;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className={`relative flex flex-col overflow-hidden rounded-2xl p-6 transition-shadow duration-300 ${
        highlighted
          ? 'bg-ink-900 text-white shadow-soft-lg ring-1 ring-ink-900 lg:-my-2 lg:py-8 dark:bg-electric-600 dark:ring-electric-600'
          : 'border border-ink-100 bg-white text-ink-900 shadow-soft hover:shadow-soft-lg dark:border-white/10 dark:bg-white/5 dark:text-white'
      }`}
    >
      {/* animated glow for Pro */}
      {highlighted && (
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-electric-500/30 blur-xl"
        />
      )}

      {/* Most popular ribbon */}
      {highlighted && (
        <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-electric-500 px-2.5 py-1 text-2xs font-semibold uppercase tracking-wider text-white shadow-soft">
          <Sparkles className="h-3 w-3" /> Most popular
        </span>
      )}

      <div className="flex items-center gap-2">
        <h3 className={`text-sm font-semibold uppercase tracking-wider ${highlighted ? 'text-white' : 'text-ink-500 dark:text-ink-400'}`}>
          {plan.name}
        </h3>
      </div>
      <p className={`mt-2 text-sm ${highlighted ? 'text-ink-200 dark:text-white/80' : 'text-ink-500 dark:text-ink-400'}`}>{plan.tagline}</p>

      <div className="mt-5 flex h-12 items-end gap-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={price}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex items-end gap-1"
          >
            <span className="text-4xl font-semibold tracking-tight">
              {price === null ? 'Custom' : `$${price}`}
            </span>
            {price !== null && (
              <span className={`mb-1.5 text-sm ${highlighted ? 'text-ink-300 dark:text-white/70' : 'text-ink-400 dark:text-ink-500'}`}>/mo</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {price !== null && annual && (
        <p className={`mt-1 text-2xs ${highlighted ? 'text-ink-400 dark:text-white/60' : 'text-ink-400 dark:text-ink-500'}`}>billed annually</p>
      )}
      {price !== null && !annual && (
        <p className={`mt-1 text-2xs ${highlighted ? 'text-ink-400 dark:text-white/60' : 'text-ink-400 dark:text-ink-500'}`}>billed monthly</p>
      )}

      <ul className="mt-6 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${highlighted ? 'text-electric-400' : 'text-electric-600 dark:text-electric-400'}`} strokeWidth={2.4} />
            <span className={highlighted ? 'text-ink-100 dark:text-white/90' : 'text-ink-700 dark:text-ink-300'}>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          variant={highlighted ? 'dark' : 'secondary'}
          className="w-full"
          iconRight={<ArrowRight className="h-4 w-4" />}
          onClick={onBookDemo}
        >
          {plan.cta}
        </Button>
      </div>
    </motion.div>
  );
}
