import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

class DummyWebSocket {}

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://acomo-fallback.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'fallback-anon-key',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
      realtime: {
        transport: DummyWebSocket as any,
      },
    }
  );
}
