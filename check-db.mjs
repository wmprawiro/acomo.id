import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  console.log('Membaca tabel profiles...');
  const { data, error } = await supabase.from('profiles').select('*');
  
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log(`Ditemukan ${data.length} user!`);
    if(data.length > 0) {
      console.log('--- Data Profil ---');
      console.log('Nama:', data[0].full_name);
      console.log('Avatar:', data[0].avatar_url ? 'Ada link foto' : 'Kosong');
      console.log('Mata Uang:', data[0].currency);
    }
  }
}

check();
