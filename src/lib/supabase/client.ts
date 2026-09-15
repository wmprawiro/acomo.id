import { createBrowserClient } from '@supabase/ssr';

class DummyWebSocket {}

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      realtime: {
        transport: typeof window !== 'undefined' ? undefined : (DummyWebSocket as any),
      },
    }
  );
