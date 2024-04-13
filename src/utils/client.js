import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ekcnbalczcqlpckprbce.supabase.co";
const supabaseKey = import.meta.env.VITE_APP_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;