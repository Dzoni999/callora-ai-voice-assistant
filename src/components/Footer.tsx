import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { Logo } from '@/components/Logo';

const columns = [
  {
    title: 'Product',
    links: ['Features', 'Industries', 'Pricing', 'Demo'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Blog', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'API', 'Security', 'Status'],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-white dark:border-white/10 dark:bg-[#0B0F19]">
      <div className="container-px mx-auto max-w-7xl py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <a href="#top">
              <Logo />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              The voice AI receptionist that answers every call, books appointments, and never misses a customer.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 text-ink-600 transition-colors hover:border-ink-300 hover:bg-ink-50 hover:text-ink-900 dark:border-white/10 dark:text-ink-400 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-2xs font-semibold uppercase tracking-[0.18em] text-ink-400 dark:text-ink-500">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-ink-600 transition-colors hover:text-ink-900 dark:text-ink-400 dark:hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-100 pt-6 sm:flex-row dark:border-white/10">
          <p className="text-xs text-ink-400 dark:text-ink-500">© 2026 Callora AI, Inc. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs text-ink-400 dark:text-ink-500">
            <a href="#" className="transition-colors hover:text-ink-700 dark:hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-ink-700 dark:hover:text-white">Terms</a>
            <a href="#" className="transition-colors hover:text-ink-700 dark:hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
