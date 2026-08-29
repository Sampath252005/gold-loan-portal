import api from "./api";

export const getLoanSchemes = async () => {
  const response = await api.get("/loan-schemes");

  return response.data;
};