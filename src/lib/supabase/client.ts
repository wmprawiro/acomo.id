import { createBrowserClient } from '@supabase/ssr';

class DummyWebSocket {}

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://acomo-fallback.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'fallback-anon-key',
    {
      realtime: {
        transport: typeof window !== 'undefined' ? undefined : (DummyWebSocket as any),
      },
    }
  );
