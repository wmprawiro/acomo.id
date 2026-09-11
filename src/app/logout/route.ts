import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  
  // Inisialisasi Supabase Server Client
  const supabase = await createClient();
  
  // Lakukan proses logout (ini otomatis menghapus cookie sesi di browser)
  await supabase.auth.signOut();
  
  // Arahkan user kembali ke halaman login
  return NextResponse.redirect(`${origin}/login`);
}
