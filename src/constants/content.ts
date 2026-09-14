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
    title: "Can I connect acomo to my bank account?",
    content: "Currently, acomo does not support automatic bank connections. All transactions and cash flows are recorded manually to give you full control and awareness over every entry.",
  },
  {
    id: 'data-security',
    title: "Is my financial data secure?",
    content: "Absolutely. We use industry-standard encryption and strict security protocols to ensure that your financial data remains completely private and safe at all times.",
  },
  {
    id: 'pricing',
    title: "How much does acomo cost?",
    content: "You can start using acomo right away for free. As we grow, we may introduce premium plans with advanced features, but our core tracking tools will always remain accessible.",
  },
  {
    id: 'how-to-start',
    title: "How do I get started?",
    content: "Simply click the 'Continue with Google' button at the top of the page. You can immediately access the dashboard and start managing your cash flow without any waitlist.",
  },
];

export const FOOTER_LINKS: FooterLink[] = [
  { id: 'support', label: "Support", href: "mailto:support@acomo.id" },
  { id: 'privacy', label: "Privacy Policy", href: "/privacy" },
  { id: 'terms', label: "Terms of Service", href: "/terms" },
  { id: 'security', label: "Security", href: "/security" },
];

