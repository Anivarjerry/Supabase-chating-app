import { createClient, SupabaseClient } from '@supabase/supabase-js';

// IMPORTANT: Replace with your own Supabase URL and Anon Key
// You can get these from your Supabase project settings
const supabaseUrl = 'https://ozgtnfcmyhfkiuopysvl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96Z3RuZmNteWhma2l1b3B5c3ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3OTEzNjIsImV4cCI6MjA3ODM2NzM2Mn0.g6i6j32VyySmDLIYwX5AynXf-aXhYTCnxNGg8Fa-3mY';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required in services/supabaseClient.ts");
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
