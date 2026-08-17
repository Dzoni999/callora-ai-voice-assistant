import { motion } from 'framer-motion';
import { Play, ArrowRight, Clock, Sparkles, Zap, PhoneCall, CalendarCheck, SignalHigh } from 'lucide-react';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { fadeUp, staggerParent } from '@/lib/motion';

interface HeroProps {
  onBookDemo: () => void;
}

const trustBadges = [
  { icon: Clock, label: '24/7 Availability' },
  { icon: Sparkles, label: 'Human-like Voice' },
  { icon: Zap, label: 'Setup in 24 Hours' },
];

export function Hero({ onBookDemo }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-44">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-electric-50/60 via-white to-white dark:from-electric-950/30 dark:via-[#0B0F19] dark:to-[#0B0F19]" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="absolute inset-x-0 top-0 h-[640px] bg-grid-faint bg-[size:48px_48px] opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)] dark:opacity-20" />
        <div className="absolute -top-24 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-electric-400/10 blur-3xl dark:bg-electric-500/15" />
      </div>

      <div className="container-px mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Left: copy */}
          <motion.div
            variants={staggerParent}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.div variants={fadeUp}>
              <Badge icon={<span className="h-1.5 w-1.5 rounded-full bg-electric-500 animate-pulse" />}>
                Now onboarding businesses for Q3
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.03em] leading-[1.04] text-ink-900 dark:text-white"
            >
              Never miss another{' '}
              <span className="relative whitespace-nowrap">
                <span className="text-gradient-blue">customer call.</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full text-electric-400/70"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M2 9C70 3 230 2 298 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg sm:text-xl text-ink-500 leading-relaxed dark:text-ink-400"
            >
              Your AI receptionist answers every call, books appointments, and qualifies leads —
              while you focus on your business.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={onBookDemo} iconRight={<ArrowRight className="h-4 w-4" />}>
                Book a Demo
              </Button>
              <Button
                size="lg"
                variant="secondary"
                icon={<Play className="h-4 w-4 fill-current" />}
                onClick={() => document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Watch Demo
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-2.5">
              {trustBadges.map((b) => (
                <Badge key={b.label} icon={<b.icon className="h-3.5 w-3.5" />}>
                  {b.label}
                </Badge>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative aspect-[4/5] sm:aspect-square w-full lg:scale-105">
      {/* Floating gradient orbs */}
      <motion.div
        animate={{ x: [0, 18, 0], y: [0, -16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-10 -top-10 -z-10 h-56 w-56 rounded-full bg-electric-400/25 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 14, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="pointer-events-none absolute -bottom-12 -right-8 -z-10 h-64 w-64 rounded-full bg-electric-600/20 blur-3xl"
      />

      {/* Glow */}
      <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-electric-500/20 via-electric-300/10 to-transparent blur-2xl" />

      {/* Main image card */}
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 shadow-soft-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <img
          src="/hero-voice-ai.webp"
          alt="Callora AI voice assistant answering a phone call with a live waveform and appointment dashboard"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent dark:from-[#0B0F19]/40" />
      </div>

      {/* Floating: live call card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute -left-3 top-8 sm:-left-6"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        >
          <div className="glass rounded-2xl px-4 py-3 shadow-soft-lg">
            <div className="flex items-center gap-2.5">
              <span className="relative grid h-8 w-8 place-items-center rounded-full bg-electric-500/15">
                <span className="absolute inset-0 rounded-full bg-electric-500/30 animate-pulse-ring" />
                <PhoneCall className="h-4 w-4 text-electric-600" />
              </span>
              <div>
                <p className="text-2xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Live call</p>
                <p className="text-sm font-semibold text-ink-900 dark:text-white">+1 (415) 555-0142</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating: appointment booked */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute -right-3 bottom-10 sm:-right-6"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          <div className="glass rounded-2xl px-4 py-3 shadow-soft-lg">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-900 text-white">
                <CalendarCheck className="h-4 w-4" />
              </span>
              <div>
                <p className="text-2xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Booked</p>
                <p className="text-sm font-semibold text-ink-900 dark:text-white">Tomorrow · 3:30 PM</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating: waveform chip */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <div className="glass flex items-center gap-2 rounded-full px-4 py-2 shadow-soft-lg">
            <SignalHigh className="h-3.5 w-3.5 text-electric-600" />
            <div className="flex items-end gap-0.5">
              {[10, 16, 8, 20, 12, 18, 6, 14].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-1 rounded-full bg-electric-500"
                  animate={{ height: [h, h * 1.8, h] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    delay: i * 0.08,
                    ease: 'easeInOut',
                  }}
                  style={{ height: h }}
                />
              ))}
            </div>
            <span className="text-2xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Speaking</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
