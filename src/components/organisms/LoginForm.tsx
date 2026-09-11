'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms';
import { createClient } from '@/lib/supabase/client';

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<'google' | null>(null);

  const handleOAuthLogin = async (provider: 'google') => {
    setIsLoading(provider);
    
    const supabase = createClient();
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Error logging in:', error.message);
      setIsLoading(null);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl p-8 sm:p-10 rounded-[24px] shadow-2xl border border-white/10 text-foreground">
      <div className="space-y-6">
        <Button 
          type="button" 
          className="w-full bg-white hover:bg-gray-100 border-none h-[52px] rounded-full transition-transform active:scale-[0.98]"
          disabled={isLoading !== null}
          onClick={() => handleOAuthLogin('google')}
        >
          <div className="flex items-center justify-center gap-[10px] w-full">
            {isLoading === 'google' ? (
               <span className="animate-spin w-[22px] h-[22px] border-[2.5px] border-gray-400 border-t-transparent rounded-full" />
            ) : (
              <svg className="w-[22px] h-[22px] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            <span className="text-black font-semibold text-[17px]">Continue with Google</span>
          </div>
        </Button>
      </div>
      
      <p className="mt-8 text-center text-[13px] leading-relaxed text-white/40">
        By continuing, you agree to our <br className="hidden sm:block" /> 
        <a href="#" className="underline hover:text-white/70 transition-colors">Terms of Service</a> and <a href="#" className="underline hover:text-white/70 transition-colors">Privacy Policy</a>.
      </p>
    </div>
  );
};
