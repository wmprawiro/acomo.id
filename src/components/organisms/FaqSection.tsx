import React from "react";
import { FaqItem } from "@/components/molecules";
import { FAQ_DATA } from "@/constants/content";
import { Container } from "@/components/atoms";

export const FaqSection: React.FC = () => {
  return (
    <section className="relative z-10 flex flex-col items-center py-30 w-full">
      <Container className="flex flex-col items-center">
        <h2 className="font-bold leading-none text-5xl text-white mb-16 text-center max-w-[800px]">
          Frequently Asked Questions
        </h2>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-6 items-start">
          {FAQ_DATA.map((faq) => (
            <FaqItem
              key={faq.id}
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
