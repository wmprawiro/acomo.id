import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const searchParams = requestUrl.searchParams;
  const code = searchParams.get('code');
  // Kalau ada parameter 'next', kita arahkan ke sana, jika tidak ke /dashboard
  const next = searchParams.get('next') ?? '/dashboard';

  // Dapatkan origin yang sebenarnya (berguna jika di belakang EdgeOne, Cloudflare, atau Vercel)
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
      // Jika berhasil, redirect ke URL tujuan (misal: /dashboard)
      return NextResponse.redirect(`${origin}${next}`);
    } else {
      console.error("Auth callback error:", error.message);
    }
  }

  // Jika gagal, kembalikan ke halaman login
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`);
}
