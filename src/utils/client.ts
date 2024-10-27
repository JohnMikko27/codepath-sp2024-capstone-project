import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_API_URL;
const supabaseApiKey =  import.meta.env.VITE_APP_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseApiKey);

export default supabase;
