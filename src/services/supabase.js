import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://hdssijhdxjbsvtjjhsma.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkc3NpamhkeGpic3Z0ampoc21hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0Njg0MTIsImV4cCI6MjAyNjA0NDQxMn0.EaacaBxSSdWXu7aokmmBmOQlQeTYi6Aem98cLqXfidU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
