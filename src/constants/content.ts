import type { FaqItem, FooterLink } from '@/types/content';

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'what-is-acomo',
    title: "What exactly is acomo?",
    content: "acomo is a smart cash flow management tool that helps you track, forecast, and optimize your finances so your balance never unexpectedly drops to zero.",
    defaultOpen: true,
  },
  {
    id: 'personal-or-business',
    title: "Is acomo for personal or business use?",
    content: "It is designed for both! Whether you are managing your personal budget or keeping track of your startup's runway, acomo easily adapts to your financial needs.",
  },
  {
    id: 'bank-connection',
    title: "Will acomo connect to my bank account?",
    content: "Yes, acomo will securely integrate with major banks and financial institutions so you can sync your transactions automatically in real-time.",
  },
  {
    id: 'data-security',
    title: "Is my financial data secure?",
    content: "Absolutely. We use bank-level encryption and strict security protocols to ensure that your financial data remains completely private and safe at all times.",
  },
  {
    id: 'pricing',
    title: "How much will acomo cost?",
    content: "Our early access users will receive a special lifetime discount. We will offer a generous free tier as well as premium plans with advanced forecasting features.",
  },
  {
    id: 'early-access',
    title: "How do I get early access?",
    content: "Simply enter your email address in the form at the top of the page. We'll notify you the moment we launch our exclusive beta.",
  },
];

export const FOOTER_LINKS: FooterLink[] = [
  { id: 'support', label: "Support", href: "#" },
  { id: 'privacy', label: "Privacy Policy", href: "#" },
  { id: 'terms', label: "Terms of Service", href: "#" },
  { id: 'security', label: "Security", href: "#" },
];

