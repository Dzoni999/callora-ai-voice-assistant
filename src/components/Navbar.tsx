import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { useTheme } from '@/lib/useTheme';

interface NavbarProps {
  onBookDemo: () => void;
}

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Industries', href: '#industries' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar({ onBookDemo }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-2.5' : 'py-4'
      }`}
    >
      <div className="container-px mx-auto max-w-7xl">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-5 py-2.5 transition-all duration-500 ${
            scrolled
              ? 'glass shadow-soft'
              : 'border border-transparent bg-transparent'
          }`}
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5"
          >
            <Logo />
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100/70 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={toggle} />
            <div className="hidden md:block">
              <Button size="sm" onClick={onBookDemo}>
                Book a Demo
              </Button>
            </div>

            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 bg-white/70 text-ink-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-ink-200 md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden md:hidden"
            >
              <div className="glass mt-2 flex flex-col gap-1 rounded-2xl p-3">
                {links.map((l) => (
                  <button
                    key={l.href}
                    onClick={() => handleNav(l.href)}
                    className="rounded-xl px-4 py-2.5 text-left text-sm font-medium text-ink-700 transition-colors hover:bg-ink-100/70 dark:text-ink-200 dark:hover:bg-white/10"
                  >
                    {l.label}
                  </button>
                ))}
                <Button className="mt-1 w-full" onClick={() => { setOpen(false); onBookDemo(); }}>
                  Book a Demo
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 bg-white/70 text-ink-700 backdrop-blur transition-colors hover:bg-ink-100 dark:border-white/10 dark:bg-white/5 dark:text-ink-200 dark:hover:bg-white/10"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-4.5 w-4.5" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-4.5 w-4.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
