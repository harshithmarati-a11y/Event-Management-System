import API from "./api";

export const getReport = async () => {
  const response = await API.get("/reports");
  return response.data;
};