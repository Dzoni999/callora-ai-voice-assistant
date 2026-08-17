import { motion } from 'framer-motion';
import { PhoneCall, PhoneOff, CalendarCheck, Smile, TrendingUp } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { fadeUp, staggerParent, viewportOnce } from '@/lib/motion';

const stats = [
  { icon: PhoneCall, label: 'Calls answered today', value: '1,284', delta: '+12%', tone: 'electric' },
  { icon: PhoneOff, label: 'Missed calls prevented', value: '317', delta: '+8%', tone: 'emerald' },
  { icon: CalendarCheck, label: 'Appointments booked', value: '462', delta: '+19%', tone: 'electric' },
  { icon: Smile, label: 'Customer satisfaction', value: '4.9/5', delta: '+0.2', tone: 'amber' },
];

const week = [
  { day: 'Mon', value: 62 },
  { day: 'Tue', value: 78 },
  { day: 'Wed', value: 71 },
  { day: 'Thu', value: 94 },
  { day: 'Fri', value: 88 },
  { day: 'Sat', value: 56 },
  { day: 'Sun', value: 40 },
];

const toneMap: Record<string, string> = {
  electric: 'bg-electric-500/10 text-electric-600',
  emerald: 'bg-emerald-500/10 text-emerald-600',
  amber: 'bg-amber-500/10 text-amber-600',
};

export function AnalyticsDashboard() {
  return (
    <section id="analytics" className="section-pad relative bg-ink-50/40 dark:bg-white/[0.02]">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Dashboard"
          title={<>Every call, measured.</>}
          description="Track outcomes, lead quality, and revenue impact in one clean dashboard — updated in real time."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-14 max-w-5xl"
        >
          {/* Dashboard shell */}
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-4 shadow-soft-lg backdrop-blur-xl sm:p-6 dark:border-white/10 dark:bg-white/5"
          >
            {/* top bar */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-xs font-medium text-ink-400 dark:text-ink-500">app.callora.ai/dashboard</span>
              </div>
              <span className="hidden items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-2xs font-semibold text-emerald-600 sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
              </span>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-soft backdrop-blur-md dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between">
                    <span className={`grid h-9 w-9 place-items-center rounded-xl ${toneMap[s.tone]}`}>
                      <s.icon className="h-4.5 w-4.5" strokeWidth={2.2} />
                    </span>
                    <span className="inline-flex items-center gap-1 text-2xs font-semibold text-emerald-600">
                      <TrendingUp className="h-3 w-3" /> {s.delta}
                    </span>
                  </div>
                  <p className="mt-4 text-2xl font-semibold tracking-tight text-ink-900 dark:text-white">{s.value}</p>
                  <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Chart row */}
            <div className="mt-4 grid gap-3 sm:gap-4 lg:grid-cols-[1.6fr_1fr]">
              <ChartCard />
              <SatisfactionCard />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ChartCard() {
  const max = Math.max(...week.map((d) => d.value));
  return (
    <motion.div variants={fadeUp} className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-soft backdrop-blur-md dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-ink-900 dark:text-white">Weekly call volume</h4>
          <p className="text-xs text-ink-500 dark:text-ink-400">Calls answered per day</p>
        </div>
        <span className="rounded-full bg-electric-50 px-2.5 py-1 text-2xs font-semibold text-electric-700 dark:bg-electric-500/15 dark:text-electric-300">This week</span>
      </div>

      <div className="mt-6 flex h-40 items-end justify-between gap-2 sm:gap-3">
        {week.map((d, i) => {
          const pct = (d.value / max) * 100;
          return (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-1 items-end">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${pct}%` }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                  className="w-full rounded-t-md bg-gradient-to-t from-electric-500 to-electric-400"
                  style={{ minHeight: 6 }}
                />
              </div>
              <span className="text-2xs font-medium text-ink-400 dark:text-ink-500">{d.day}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function SatisfactionCard() {
  const points = [88, 90, 89, 92, 93, 95, 96];
  const w = 100;
  const h = 40;
  const max = 100;
  const min = 84;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / (max - min)) * h;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  const area = `${path} L${w},${h} L0,${h} Z`;

  return (
    <motion.div variants={fadeUp} className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-soft backdrop-blur-md dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-ink-900 dark:text-white">Satisfaction trend</h4>
          <p className="text-xs text-ink-500 dark:text-ink-400">Last 7 days</p>
        </div>
        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">96%</span>
      </div>

      <div className="mt-5">
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-24 w-full">
          <defs>
            <linearGradient id="sat-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2f8eff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2f8eff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={area}
            fill="url(#sat-fill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.path
            d={path}
            fill="none"
            stroke="#2f8eff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.1 }}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-between text-2xs text-ink-400 dark:text-ink-500">
        <span>Mon</span>
        <span>Sun</span>
      </div>
    </motion.div>
  );
}
