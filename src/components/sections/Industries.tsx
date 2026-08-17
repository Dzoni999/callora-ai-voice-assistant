import { useState } from 'react';
import { type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Stethoscope, Scissors, UtensilsCrossed, Home, Wrench, HeartPulse, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { fadeUp, staggerParent, viewportOnce } from '@/lib/motion';

interface Industry {
  icon: LucideIcon;
  name: string;
  blurb: string;
  stat: string;
}

const industries: Industry[] = [
  { icon: Stethoscope, name: 'Dental Clinics', blurb: 'Books cleanings, handles insurance questions, reduces no-shows.', stat: '−32% no-shows' },
  { icon: Scissors, name: 'Beauty Salons', blurb: 'Schedules stylists by service and duration, confirms reminders.', stat: '+41% rebookings' },
  { icon: UtensilsCrossed, name: 'Restaurants', blurb: 'Takes reservations, answers menu and hours questions, routes large-party requests.', stat: '24/7 reservations' },
  { icon: Home, name: 'Real Estate', blurb: 'Qualifies buyers, books showings, captures listings inquiries after hours.', stat: '+58% lead capture' },
  { icon: Wrench, name: 'Auto Services', blurb: 'Schedules service appointments, quotes common jobs, routes urgent tow calls.', stat: '−27% hold time' },
  { icon: HeartPulse, name: 'Medical Practices', blurb: 'Screens symptoms, books visits, escalates urgent calls to on-call staff.', stat: 'HIPA-ready flows' },
];

export function Industries() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="industries" className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Industries"
          title={<>Built for businesses that live by the phone.</>}
          description="Callora comes pre-trained on the conversations your industry actually has — no generic bots."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {industries.map((ind, i) => (
            <IndustryCard key={ind.name} ind={ind} active={active === i} onEnter={() => setActive(i)} onLeave={() => setActive(null)} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function IndustryCard({
  ind,
  active,
  onEnter,
  onLeave,
}: {
  ind: Industry;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      animate={{ y: active ? -6 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`group relative overflow-hidden rounded-2xl border p-6 transition-colors duration-500 ${
        active
          ? 'border-ink-900/10 bg-ink-900 text-white dark:border-white/10 dark:bg-electric-600'
          : 'border-ink-100 bg-white text-ink-900 dark:border-white/10 dark:bg-white/5 dark:text-white'
      }`}
    >
      {/* gradient sheen on hover */}
      <motion.div
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-electric-500/20 blur-2xl"
      />

      <div className="relative flex items-start justify-between">
        <span className="relative grid h-11 w-11 place-items-center rounded-xl transition-colors duration-500">
          {/* glow ring */}
          <motion.span
            animate={{ opacity: active ? 0.6 : 0, scale: active ? 1.15 : 0.8 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 rounded-xl bg-electric-500/40 blur-md"
          />
          <span
            className={`relative grid h-11 w-11 place-items-center rounded-xl transition-colors duration-500 ${
              active ? 'bg-white/10 text-electric-400' : 'bg-ink-100 text-ink-900 dark:bg-white/10 dark:text-white'
            }`}
          >
            <ind.icon className="h-5 w-5" strokeWidth={2.2} />
          </span>
        </span>
        <ArrowUpRight
          className={`h-4 w-4 transition-all duration-300 ${
            active ? 'text-electric-400 translate-y-0 opacity-100' : 'text-ink-300 translate-y-0.5 opacity-70 dark:text-ink-500'
          }`}
        />
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">{ind.name}</h3>
      <p
        className={`mt-2 text-sm leading-relaxed transition-colors duration-500 ${
          active ? 'text-ink-200 dark:text-white/80' : 'text-ink-500 dark:text-ink-400'
        }`}
      >
        {ind.blurb}
      </p>
      <div
        className={`mt-5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-2xs font-semibold uppercase tracking-wider transition-colors duration-500 ${
          active ? 'bg-electric-500/20 text-electric-300' : 'bg-electric-50 text-electric-700 dark:bg-electric-500/15 dark:text-electric-300'
        }`}
      >
        {ind.stat}
      </div>
    </motion.div>
  );
}
