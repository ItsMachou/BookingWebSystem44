import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fxnbmnduxydjsfkzsqtl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4bmJtbmR1eHlkanNma3pzcXRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExMjgzMTksImV4cCI6MjA0NjcwNDMxOX0.uPFnntpdKnJXo-nO6KSFtm94A7TTC8HRmkivjvZCqg8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);