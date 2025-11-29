import { Database } from "@/database.types";
import { createClient } from "@supabase/supabase-js";

// Get environment variables with fallbacks to prevent crashes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Create client - will work even if env vars are missing (will fail on actual API calls)
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export { supabase };
