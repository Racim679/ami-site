// AMI Immobilier - Supabase Client
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://iuuolubfhswwgrpumqtc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1dW9sdWJmaHN3d2dycHVtcXRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMjI5MjYsImV4cCI6MjA2NDU5ODkyNn0.vTP5bNpzdAFQOm4jKV0k6xNZ7JbP2OyzsLG5WE854lM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});