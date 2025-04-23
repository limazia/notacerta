import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabaseAuth = process.env.SUPABASE_AUTH!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseApi = axios.create({
  baseURL: `${process.env.SUPABASE_URL}/rest/v1/rpc`,
  headers: {
    "Content-Type": "application/json",
    apikey: supabaseAuth,
    Authorization: `Bearer ${supabaseAuth}`,
  },
});
