import { AppTemplate } from '@/components/templates';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppTemplate>{children}</AppTemplate>;
}
