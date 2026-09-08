import React from 'react';
import { FOOTER_LINKS } from '@/constants/content';
import { Container } from '@/components/atoms/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 flex flex-col items-center justify-center py-16 w-full mt-10">
      <Container className="flex flex-col items-center">
        <div className="h-[18px] w-[104px] mb-12">
          <img alt="acomo logo" className="block w-full h-full object-contain" src="/assets/icon-row.svg" />
        </div>

        <nav className="flex flex-col md:flex-row flex-wrap font-medium gap-6 md:gap-[64px] items-center justify-center leading-[28px] text-[16px] md:text-[18px] text-center text-white mb-10">
          {FOOTER_LINKS.map((link, index) => (
            <a key={index} href={link.href} className="cursor-pointer hover:text-gray-300 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <p className="font-medium leading-[28px] text-[14px] md:text-[18px] text-center text-gray-400">
          {`© ${new Date().getFullYear()} acomo by wmprawiro.dev `}
        </p>
      </Container>
    </footer>
  );
};
