import { type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { PhoneCall, CalendarCheck, PhoneForwarded, Languages, Plug, BarChart3 } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { fadeUp, staggerParent, viewportOnce } from '@/lib/motion';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: PhoneCall,
    title: 'Answers every call',
    description: 'No voicemail, no missed leads. Callora picks up on the first ring, 24/7.',
  },
  {
    icon: CalendarCheck,
    title: 'Books appointments automatically',
    description: 'Syncs with your calendar in real time and reserves the right slot instantly.',
  },
  {
    icon: PhoneForwarded,
    title: 'Transfers urgent calls',
    description: 'Recognizes urgency and warm-transfers to a human when it matters most.',
  },
  {
    icon: Languages,
    title: 'Multilingual conversations',
    description: 'Speaks naturally in 30+ languages, switching mid-call to match your caller.',
  },
  {
    icon: Plug,
    title: 'CRM integration',
    description: 'Pushes calls, transcripts, and bookings straight into your existing tools.',
  },
  {
    icon: BarChart3,
    title: 'Call analytics dashboard',
    description: 'Track outcomes, lead quality, and revenue impact in one clean dashboard.',
  },
];

export function Features() {
  return (
    <section id="features" className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Features"
          title={<>Everything a great receptionist does — without the hold music.</>}
          description="Callora handles the full call lifecycle from the first hello to the booked appointment, so your team never touches the phone."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description }: Feature) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-soft-lg dark:border-white/10 dark:bg-white/5"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-electric-500/5 blur-2xl transition-opacity duration-300 group-hover:bg-electric-500/10" />
      <div className="relative">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-ink-900 text-electric-400 shadow-soft transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </div>
        <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{description}</p>
      </div>
    </motion.div>
  );
}
