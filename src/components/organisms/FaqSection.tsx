import React from 'react';
import { FaqItem } from '@/components/molecules/FaqItem';
import { FAQ_DATA } from '@/constants/content';
import { Container } from '@/components/atoms/Container';

export const FaqSection: React.FC = () => {
  return (
    <section className="relative z-10 flex flex-col items-center py-[120px] w-full">
      <Container className="flex flex-col items-center">
        <h2 className="font-bold leading-[48px] text-[48px] text-white mb-[64px] text-center max-w-[800px]">
          Frequently Asked Questions
        </h2>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-[16px] gap-x-[24px] items-start">
          {FAQ_DATA.map((faq, index) => (
            <FaqItem 
              key={index}
              title={faq.title} 
              content={faq.content}
              defaultOpen={faq.defaultOpen}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
