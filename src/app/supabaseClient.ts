import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://docljuarpqlonyhhnnuo.supabase.co";
const supabaseAnonKey = "sb_publishable_Y1VzLW_dmiCvAUFMZ6S0Sw_CjWwsbB8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
