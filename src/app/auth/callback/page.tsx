"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const supabase = createClient();

        // Wait for the session to be established
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        if (data.session) {
          router.replace("/dashboard");
        } else {
          // Listen for the auth state change if session isn't ready immediately
          const {
            data: { subscription },
          } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session) {
              router.replace("/dashboard");
            }
          });

          // Cleanup timeout
          setTimeout(() => {
            subscription.unsubscribe();
            if (!data.session) {
              router.replace("/?error=Could not complete authentication");
            }
          }, 5000);
        }
      } catch (err: unknown) {
        console.error("Auth error:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Authentication failed";
        setError(errorMessage);
        setTimeout(
          () =>
            router.replace("/?error=" + encodeURIComponent(errorMessage)),
          3000,
        );
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
