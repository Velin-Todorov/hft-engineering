import { Database } from "@/database.types";
import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client for admin operations
// Using singleton pattern to avoid multiple GoTrueClient instances
let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

export function createServerClient() {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required"
      );
    }
    
    supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);
  }
  return supabaseClient;
}
