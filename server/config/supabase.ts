import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(" Supabase URL or KEY is missing. Please check your environment variables.");
}

console.log("✅ Supabase URL:", supabaseUrl);
console.log("✅ Supabase KEY exists:");

export const supabase = createClient(supabaseUrl, supabaseKey);