import { motion } from 'framer-motion';
import { PhoneIncoming, AudioLines, CalendarCheck } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { fadeUp, staggerParent, viewportOnce } from '@/lib/motion';

const steps = [
  {
    icon: PhoneIncoming,
    step: '01',
    title: 'Customer calls',
    description: 'A customer dials your business number — Callora answers instantly, any time of day.',
  },
  {
    icon: AudioLines,
    step: '02',
    title: 'AI speaks naturally',
    description: 'It greets, understands intent, answers questions, and offers the best available slot.',
  },
  {
    icon: CalendarCheck,
    step: '03',
    title: 'Appointment appears on your calendar',
    description: 'The booking lands on your calendar instantly, with a confirmation SMS sent to the caller.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad relative bg-ink-50/40 dark:bg-white/[0.02]">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How it works"
          title={<>From ring to booked in three steps.</>}
          description="No new phone number to memorize, no app for your customers to install. It just works."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mt-14 grid gap-6 md:grid-cols-3"
        >
          {/* connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent md:block dark:via-white/15" />

          {steps.map((s) => (
            <motion.div key={s.step} variants={fadeUp} className="relative">
              <div className="relative rounded-2xl border border-ink-100 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center justify-between">
                  <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-ink-900 text-white shadow-soft">
                    <s.icon className="h-5 w-5 text-electric-400" strokeWidth={2.2} />
                  </span>
                  <span className="text-3xl font-semibold tracking-tight text-ink-100 dark:text-white/10">{s.step}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink-900 dark:text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
