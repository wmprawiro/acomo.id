import React from "react";
import Link from "next/link";
import { FOOTER_LINKS } from "@/constants/content";
import { Container } from "@/components/atoms";

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 flex flex-col items-center justify-center py-16 w-full mt-10">
      <Container className="flex flex-col items-center">
        <Link href="/" className="block h-4 w-26 mb-12 cursor-pointer">
          <img
            alt="acomo logo"
            className="block w-full h-full object-contain"
            src="/assets/icon-row.svg"
          />
        </Link>

        <nav className="flex flex-col md:flex-row flex-wrap font-medium gap-6 md:gap-16 items-center justify-center leading-7 text-base md:text-lg text-center text-white mb-10">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="cursor-pointer hover:text-gray-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="font-medium leading-7 text-sm md:text-lg text-center text-gray-400">
          {`© ${new Date().getFullYear()} acomo by wmprawiro.dev `}
        </p>
      </Container>
    </footer>
  );
};
