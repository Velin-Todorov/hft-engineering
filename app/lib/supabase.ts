import { Database } from "@/database.types";
import { createClient } from "@supabase/supabase-js";


if (!process.env.NEXT_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    throw new Error('Missing environment variables for Supabase');
}

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
const supabaseUrl = process.env.NEXT_SUPABASE_URL
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export { supabase };

