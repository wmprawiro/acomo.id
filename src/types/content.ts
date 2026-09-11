export interface FaqItem {
  id: string;
  title: string;
  content: string;
  defaultOpen?: boolean;
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}
