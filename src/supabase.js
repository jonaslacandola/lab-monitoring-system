import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ylcrastmkkjzgmyxfwoo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3Jhc3Rta2tqemdteXhmd29vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1Nzg5MTUsImV4cCI6MjAxOTE1NDkxNX0.FpQOSp7aaUCqrAUhd7XcHQPhhZszqRk8_0QX24IbiBQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
