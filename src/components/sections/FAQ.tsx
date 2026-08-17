import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { fadeUp, staggerParent, viewportOnce } from '@/lib/motion';

const faqs = [
  {
    q: 'How quickly can Callora start answering my calls?',
    a: 'Most businesses are live within 24 hours. We forward your existing number, train Callora on your services and hours, and connect your calendar — no new phone line required.',
  },
  {
    q: 'Will customers know they’re talking to an AI?',
    a: 'Callora speaks naturally with human-like pacing, tone, and fillers. Most callers don’t realize it’s AI. That said, we can always introduce it explicitly if your industry or region requires disclosure.',
  },
  {
    q: 'What happens when a call is urgent?',
    a: 'Callora recognizes urgency from keywords and context, then warm-transfers the call to a number you choose — your on-call staff, front desk, or manager — while keeping the caller on the line.',
  },
  {
    q: 'Which calendars and CRMs does it integrate with?',
    a: 'Google Calendar, Outlook, Calendly, HubSpot, Salesforce, Pipedrive, and Zapier out of the box. We add new integrations every month and offer a webhook API for custom stacks.',
  },
  {
    q: 'Can it handle calls in other languages?',
    a: 'Yes. Callora speaks 30+ languages and can switch mid-call to match the caller’s language. It also transcribes and summarizes every call in the language of your choice.',
  },
  {
    q: 'Do I have to change my phone number?',
    a: 'No. You keep your current number and simply forward it to Callora. If you ever stop using us, un-forwarding is instant and your number is untouched.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad relative">
      <div className="container-px mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title={<>Questions, answered.</>}
          description="Everything you might want to know before booking a demo."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white shadow-soft dark:divide-white/10 dark:border-white/10 dark:bg-white/5"
        >
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={i} variants={fadeUp}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className="text-base font-semibold tracking-tight text-ink-900 dark:text-white">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${
                      isOpen ? 'bg-ink-900 text-white dark:bg-electric-600' : 'bg-ink-100 text-ink-700 dark:bg-white/10 dark:text-white'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-ink-500 dark:text-ink-400 sm:px-6">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
