'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { AppTemplate } from '@/components/templates';
import { PreferencesProvider, FinanceProvider, MaskingProvider } from '@/contexts';

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/');
      }
    });
  }, [router]);

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
