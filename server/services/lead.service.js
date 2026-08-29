import { getSupabase } from "../src/config/supabase.js";

export const findRecentLeadByMobile = async (mobileNumber) => {
  const supabase = getSupabase();

  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("mobile_number", mobileNumber)
    .gte("created_at", sevenDaysAgo.toISOString());

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


export const getLoanSchemeByCode = async (planCode) => {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("loan_schemes")
    .select("*")
    .eq("plan_code", planCode)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


export const createLead = async (leadData) => {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("leads")
    .insert(leadData)
    .select()
    .single();

  if (error) {
    const databaseError = new Error(error.message);
    databaseError.code = error.code;
    throw databaseError;
  }

  return data;
};


export const getAllLeads = async () => {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("leads")
    .select(`
      *,
      loan_schemes (
        name,
        plan_code
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
