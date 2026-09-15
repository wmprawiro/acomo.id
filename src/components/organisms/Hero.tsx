import React from "react";
import { EmailSubscription } from "@/components/molecules";
import { Container } from "@/components/atoms";

export const Hero: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center pt-24 md:pt-32 pb-12 w-full">
      <Container className="flex flex-col items-center">
        <h1 className="font-bold leading-tight md:leading-none text-4xl sm:text-5xl md:text-7xl text-center text-white max-w-4xl mb-6">
          Don&apos;t let your balance hit zero, master your cash flow with acomo
        </h1>

        <p className="font-medium leading-relaxed md:leading-7 text-base md:text-lg text-center text-white max-w-xl mb-12">
          Track your income and expenses instantly. Take full control of your
          cash flow with acomo.
        </p>

        <div className="w-full flex justify-center z-10">
          <EmailSubscription />
        </div>

        {/* Hero Illustration */}
        <div className="relative mt-16 md:mt-24 w-full pointer-events-none flex justify-center">
          <img
            alt="hero graphic"
            className="w-full h-auto md:w-auto md:max-h-[850px] object-contain"
            src="/assets/image-1.png"
          />
        </div>
      </Container>
    </section>
  );
};
