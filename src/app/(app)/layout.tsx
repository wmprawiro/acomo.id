import { AppTemplate } from '@/components/templates';
import { PreferencesProvider, FinanceProvider } from '@/contexts';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PreferencesProvider>
      <FinanceProvider>
        <AppTemplate>{children}</AppTemplate>
      </FinanceProvider>
    </PreferencesProvider>
  );
}
