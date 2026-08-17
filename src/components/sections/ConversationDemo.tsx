import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, SignalHigh, Check, MessageSquare, Wifi, BatteryFull } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { viewportOnce } from '@/lib/motion';

type Role = 'customer' | 'ai';
interface Line {
  role: Role;
  text: string;
  time: string;
}

const script: Line[] = [
  { role: 'customer', text: "Hi, I'd like to book an appointment tomorrow.", time: '9:41 AM' },
  { role: 'ai', text: 'Absolutely. We have 3:30 PM available. Shall I reserve it?', time: '9:41 AM' },
  { role: 'customer', text: 'Yes.', time: '9:42 AM' },
  { role: 'ai', text: 'Done. A confirmation SMS has been sent.', time: '9:42 AM' },
];

export function ConversationDemo() {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible >= script.length) {
      const confirmT = setTimeout(() => setConfirmed(true), 700);
      const reset = setTimeout(() => {
        setConfirmed(false);
        setVisible(0);
      }, 5000);
      return () => {
        clearTimeout(confirmT);
        clearTimeout(reset);
      };
    }
    const isAi = script[visible]?.role === 'ai';
    setTyping(isAi);
    const t = setTimeout(
      () => {
        setTyping(false);
        setVisible((v) => v + 1);
      },
      isAi ? 1200 : 1000,
    );
    return () => clearTimeout(t);
  }, [visible]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [visible, typing, confirmed]);

  return (
    <section id="demo" className="section-pad relative bg-ink-50/40 dark:bg-white/[0.02]">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Live demo"
          title={<>Hear it for yourself.</>}
          description="A real exchange between a customer and Callora. No scripts, no buttons — just natural conversation."
        />

        <div className="mx-auto mt-14 grid max-w-5xl items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* iPhone-style mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-[280px]"
          >
            <div className="relative rounded-[2.6rem] border-[3px] border-ink-800 bg-ink-900 p-2 shadow-soft-lg dark:border-white/15 dark:bg-[#11161f]">
              {/* side buttons */}
              <span className="absolute -left-[3px] top-24 h-12 w-[3px] rounded-l bg-ink-700" />
              <span className="absolute -left-[3px] top-40 h-16 w-[3px] rounded-l bg-ink-700" />
              <span className="absolute -right-[3px] top-32 h-20 w-[3px] rounded-r bg-ink-700" />

              <div className="overflow-hidden rounded-[2.1rem] bg-white dark:bg-[#0B0F19]">
                {/* status bar */}
                <div className="relative flex items-center justify-between px-6 pt-3 pb-1 text-2xs font-semibold text-ink-900 dark:text-white">
                  <span>9:41</span>
                  <span className="absolute left-1/2 top-1.5 h-5 w-20 -translate-x-1/2 rounded-full bg-ink-900 dark:bg-white/90" />
                  <span className="flex items-center gap-1">
                    <SignalHigh className="h-3 w-3" />
                    <Wifi className="h-3 w-3" />
                    <BatteryFull className="h-3.5 w-3.5" />
                  </span>
                </div>

                {/* call screen */}
                <div className="flex flex-col items-center px-5 pb-7 pt-6 text-center">
                  <span className="relative grid h-16 w-16 place-items-center rounded-full bg-electric-500/15">
                    <span className="absolute inset-0 rounded-full bg-electric-500/25 animate-pulse-ring" />
                    <PhoneCall className="h-6 w-6 text-electric-600" />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-ink-900 dark:text-white">Callora AI</p>
                  <p className="text-2xs text-ink-400 dark:text-ink-500">Incoming call · 00:24</p>

                  <div className="mt-5 flex items-end gap-1">
                    {[8, 14, 6, 18, 10, 16, 7, 12, 9, 15].map((h, i) => (
                      <motion.span
                        key={i}
                        className="w-1 rounded-full bg-electric-500"
                        animate={{ height: [h, h * 1.7, h] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'mirror', delay: i * 0.06, ease: 'easeInOut' }}
                        style={{ height: h }}
                      />
                    ))}
                  </div>

                  <div className="mt-6 grid w-full grid-cols-2 gap-3">
                    <div className="rounded-full bg-ink-100 py-2.5 text-center text-2xs font-medium text-ink-500 dark:bg-white/10 dark:text-ink-300">
                      Mute
                    </div>
                    <div className="rounded-full bg-red-500 py-2.5 text-center text-2xs font-medium text-white">
                      End
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chat transcript */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass overflow-hidden rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink-100 px-5 py-3.5 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-semibold text-ink-900 dark:text-white">Call transcript</span>
              </div>
              <span className="flex items-center gap-1.5 text-2xs font-medium uppercase tracking-wider text-ink-400 dark:text-ink-500">
                <MessageSquare className="h-3 w-3" /> Live
              </span>
            </div>

            <div ref={scrollRef} className="flex max-h-[380px] min-h-[380px] flex-col gap-3 overflow-y-auto p-5 no-scrollbar">
              <AnimatePresence initial={false}>
                {script.slice(0, visible).map((line, i) => (
                  <Bubble key={i} role={line.role} text={line.text} time={line.time} />
                ))}
              </AnimatePresence>
              {typing && <TypingBubble />}
              <AnimatePresence>
                {confirmed && <ConfirmedCard />}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Bubble({ role, text, time }: { role: Role; text: string; time: string }) {
  const isAi = role === 'ai';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex max-w-[80%] flex-col ${isAi ? 'items-start' : 'items-end'}`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft ${
            isAi
              ? 'rounded-tl-sm bg-ink-900 text-white dark:bg-white/10'
              : 'rounded-tr-sm bg-electric-600 text-white'
          }`}
        >
          <span className="mb-1 block text-2xs font-semibold uppercase tracking-wider opacity-70">
            {isAi ? 'Callora' : 'Customer'}
          </span>
          {text}
        </div>
        <span className="mt-1 px-1 text-2xs text-ink-400 dark:text-ink-500">{time}</span>
      </div>
    </motion.div>
  );
}

function TypingBubble() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-ink-900 px-4 py-3.5 dark:bg-white/10">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-white/70"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ConfirmedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 240, damping: 20 }}
      className="self-stretch"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 shadow-soft dark:border-emerald-500/20 dark:bg-emerald-500/10">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-500 text-white"
        >
          <Check className="h-4.5 w-4.5" strokeWidth={2.6} />
        </motion.span>
        <div>
          <p className="text-sm font-semibold text-ink-900 dark:text-white">Appointment confirmed</p>
          <p className="text-2xs text-ink-500 dark:text-ink-400">Tomorrow · 3:30 PM · SMS sent to caller</p>
        </div>
      </div>
    </motion.div>
  );
}
