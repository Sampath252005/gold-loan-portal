import { getSupabase } from "../src/config/supabase.js";

export const getAllLoanSchemes = async () => {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("loan_schemes")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};  