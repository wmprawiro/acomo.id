import { AppTemplate } from '@/components/templates';
import { PreferencesProvider, FinanceProvider, MaskingProvider } from '@/contexts';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PreferencesProvider>
      <FinanceProvider>
        <MaskingProvider>
          <AppTemplate>{children}</AppTemplate>
        </MaskingProvider>
      </FinanceProvider>
    </PreferencesProvider>
  );
}
