import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowRight, Check, CalendarCheck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
}

type Errors = Partial<Record<keyof FormData, string>>;

const empty: FormData = { name: '', email: '', company: '', phone: '' };

export function DemoModal({ open, onClose }: DemoModalProps) {
  const [data, setData] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const reset = () => {
    setData(empty);
    setErrors({});
    setSubmitting(false);
    setSuccess(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!data.name.trim()) next.name = 'Please enter your name';
    if (!data.email.trim()) next.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = 'Enter a valid email';
    if (!data.phone.trim()) next.phone = 'Please enter your phone';
    else if (data.phone.replace(/\D/g, '').length < 7) next.phone = 'Enter a valid phone';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Frontend-only: simulate a request
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 900);
  };

  const update = (key: keyof FormData, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  return (
    <AnimatePresence onExitComplete={reset}>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-t-3xl border border-white/70 bg-white shadow-soft-lg sm:rounded-3xl dark:border-white/10 dark:bg-[#11161f]"
          >
            {/* Header band */}
            <div className="relative overflow-hidden bg-ink-900 px-6 py-5 text-white">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric-500/30 blur-2xl" />
              <div className="relative flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wider text-electric-300">
                    <CalendarCheck className="h-3.5 w-3.5" /> Book a demo
                  </span>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    {success ? 'You’re booked in.' : 'See Callora on your calls'}
                  </h3>
                  <p className="mt-1 text-sm text-ink-300">
                    {success ? 'We’ll be in touch shortly.' : '20 minutes. No credit card. No commitment.'}
                  </p>
                </div>
                <Logo showWordmark={false} size="sm" className="opacity-90" />
                <button
                  onClick={handleClose}
                  className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-ink-200 transition-colors hover:bg-white/20 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {success ? (
              <SuccessState onDone={handleClose} />
            ) : (
              <form onSubmit={onSubmit} className="px-6 py-6" noValidate>
                <div className="space-y-4">
                  <Field
                    label="Full name"
                    value={data.name}
                    onChange={(v) => update('name', v)}
                    placeholder="Alex Morgan"
                    error={errors.name}
                    autoFocus
                  />
                  <Field
                    label="Work email"
                    type="email"
                    value={data.email}
                    onChange={(v) => update('email', v)}
                    placeholder="alex@company.com"
                    error={errors.email}
                  />
                  <Field
                    label="Company"
                    value={data.company}
                    onChange={(v) => update('company', v)}
                    placeholder="Northwind Dental"
                    error={errors.company}
                    required={false}
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    value={data.phone}
                    onChange={(v) => update('phone', v)}
                    placeholder="+1 (415) 555-0142"
                    error={errors.phone}
                  />
                </div>

                <Button
                  type="submit"
                  className="mt-6 w-full"
                  size="lg"
                  iconRight={submitting ? undefined : <ArrowRight className="h-4 w-4" />}
                >
                  {submitting ? 'Sending…' : 'Request my demo'}
                </Button>

                <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-2xs text-ink-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-ink-300" />
                  We’ll never share your details. No spam, ever.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  autoFocus = false,
  required = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  autoFocus?: boolean;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">
        {label} {required && <span className="text-electric-600 dark:text-electric-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-electric-500/40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-ink-500 ${
          error ? 'border-red-300 focus:border-red-400' : 'border-ink-200 focus:border-electric-500 dark:border-white/10'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function SuccessState({ onDone }: { onDone: () => void }) {
  return (
    <div className="px-6 py-10 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-600"
      >
        <Check className="h-7 w-7" strokeWidth={2.6} />
      </motion.div>
      <h4 className="mt-5 text-lg font-semibold tracking-tight text-ink-900 dark:text-white">Request received</h4>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-500 dark:text-ink-400">
        Thanks for reaching out. A product specialist will email you within one business day to schedule your demo.
      </p>
      <Button className="mt-6 w-full" variant="secondary" onClick={onDone}>
        Done
      </Button>
    </div>
  );
}
