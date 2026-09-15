export const dynamic = 'force-dynamic';
export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const searchParams = requestUrl.searchParams;
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/dashboard';

    // Fallback safe origin checking
    const forwardedHost = request.headers.get('x-forwarded-host') || request.headers.get('host');
    const forwardedProto = request.headers.get('x-forwarded-proto') ?? 'https';
    const isLocal = requestUrl.hostname === 'localhost' || requestUrl.hostname === '127.0.0.1';
    
    const origin = !isLocal && forwardedHost 
      ? `${forwardedProto}://${forwardedHost}` 
      : requestUrl.origin;

    if (code) {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (!error) {
        // Gunakan origin asli atau fallback absolute URL
        return NextResponse.redirect(`${origin}${next}`);
      } else {
        console.error("Auth callback error:", error.message);
        return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
      }
    }

    return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`);
  } catch (err: any) {
    console.error("Critical error in auth/callback:", err);
    return new Response(`Error in auth callback: ${err?.message || 'Unknown error'} \n\n Stack: ${err?.stack || ''}`, { 
      status: 200,
      headers: { 'content-type': 'text/plain' }
    });
  }
}

