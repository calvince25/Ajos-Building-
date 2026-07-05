import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://docljuarpqlonyhhnnuo.supabase.co";
const supabaseAnonKey = "sb_publishable_Y1VzLW_dmiCvAUFMZ6S0Sw_CjWwsbB8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuth() {
  console.log("Attempting to connect to Supabase...");
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "omondicalvince4714@gmail.com",
      password: "sambusa"
    });
    
    if (error) {
      console.log("SUPABASE ERROR:");
      console.log(error);
      console.log("Error Name:", error.name);
      console.log("Error Message:", error.message);
      console.log("Error Status:", error.status);
    } else {
      console.log("LOGIN SUCCESSFUL:");
      console.log(data);
    }
  } catch (err) {
    console.log("CATCH BLOCK ERROR:");
    console.error(err);
  }
}

testAuth();
