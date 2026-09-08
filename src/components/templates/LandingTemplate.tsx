import React from 'react';
import { Hero } from '@/components/organisms/Hero';
import { FaqSection } from '@/components/organisms/FaqSection';
import { Footer } from '@/components/organisms/Footer';

export const LandingTemplate: React.FC = () => {
  return (
    <div className="bg-[#111218] relative min-h-screen w-full overflow-hidden flex flex-col">
      {/* Background Graphic perfectly centered */}
      <div className="absolute top-[-300px] md:top-[-400px] left-1/2 -translate-x-1/2 w-[360vw] sm:w-[120vw] md:w-[2200px] pointer-events-none">
        <img alt="background graphic" className="w-full h-auto object-contain" src="/assets/union.svg" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <Hero />
        <FaqSection />
        <Footer />
      </div>
    </div>
  );
};
