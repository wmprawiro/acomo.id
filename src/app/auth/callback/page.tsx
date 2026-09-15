'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const supabase = createClient();
        
        // Supabase client-side JS automatically handles the PKCE code exchange 
        // when the script loads on the page with a ?code= in the URL.
        // We just need to wait for the session to be established.
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (data.session) {
          router.replace('/dashboard');
        } else {
          // Listen for the auth state change if session isn't ready immediately
          const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
              router.replace('/dashboard');
            }
          });
          
          // Cleanup timeout
          setTimeout(() => {
            subscription.unsubscribe();
            if (!data.session) {
              router.replace('/login?error=Could not complete authentication');
            }
          }, 5000);
        }
      } catch (err: any) {
        console.error('Auth error:', err);
        setError(err.message || 'Authentication failed');
        setTimeout(() => router.replace('/login?error=' + encodeURIComponent(err.message || 'Authentication failed')), 3000);
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="text-center">
        {error ? (
          <p className="text-rose-500 font-medium">{error}</p>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <span className="animate-spin w-8 h-8 border-4 border-white/20 border-t-white rounded-full" />
            <p className="text-white/60 text-sm">Completing login...</p>
          </div>
        )}
      </div>
    </div>
  );
}
