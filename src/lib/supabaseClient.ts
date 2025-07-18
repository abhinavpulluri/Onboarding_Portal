import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lhhtzwpkgrvzfyzikinn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoaHR6d3BrZ3J2emZ5emlraW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTk4NzIsImV4cCI6MjA2ODM5NTg3Mn0.PyuxVSMCri13zqyepYhO1d4rLUzOZyx2C9Zg0CpqTX8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
