import { useState, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DemoModal } from '@/components/DemoModal';
import { Hero } from '@/components/sections/Hero';
import { SocialProof } from '@/components/sections/SocialProof';
import { Features } from '@/components/sections/Features';
import { AnalyticsDashboard } from '@/components/sections/AnalyticsDashboard';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Industries } from '@/components/sections/Industries';
import { ConversationDemo } from '@/components/sections/ConversationDemo';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function App() {
  const [demoOpen, setDemoOpen] = useState(false);
  const openDemo = useCallback(() => setDemoOpen(true), []);
  const closeDemo = useCallback(() => setDemoOpen(false), []);

  return (
    <div className="relative min-h-screen bg-white text-ink-900 dark:bg-[#0B0F19] dark:text-ink-100 transition-colors duration-500">
      <Navbar onBookDemo={openDemo} />

      <main>
        <Hero onBookDemo={openDemo} />
        <SocialProof />
        <Features />
        <AnalyticsDashboard />
        <HowItWorks />
        <Industries />
        <ConversationDemo />
        <Pricing onBookDemo={openDemo} />
        <FAQ />
        <FinalCTA onBookDemo={openDemo} />
      </main>

      <Footer />

      <DemoModal open={demoOpen} onClose={closeDemo} />
    </div>
  );
}
