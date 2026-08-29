import api from "./api";

export const submitLead = async (leadData) => {
  const response = await api.post(
    "/leads/submit",
    leadData
  );

  return response.data;
};


export const getAllLeads = async () => {
  const response = await api.get("/leads");

  return response.data;
};