import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qjtddytosldsdqjgqhiw.supabase.co';
const supabaseKey = 'sb_publishable_EqFRX7sNedeVEbrHFOownQ_Y_20ThB5';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
