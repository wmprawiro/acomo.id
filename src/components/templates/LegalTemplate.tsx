import React from 'react';
import { Footer } from '@/components/organisms';
import { Container } from '@/components/atoms';

interface LegalTemplateProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export const LegalTemplate: React.FC<LegalTemplateProps> = ({ title, lastUpdated, children }) => {
  return (
    <div className="bg-background relative min-h-screen w-full flex flex-col">
      <div className="flex-grow pt-24 pb-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
            <p className="text-white/60 mb-8">Last Updated: {lastUpdated}</p>
            <div className="mt-8 prose prose-invert max-w-none text-white/80 space-y-6">
              {children}
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};
