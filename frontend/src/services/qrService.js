import API from "./api";

export const generateQR = async (ticketId) => {
  const response = await API.get(
    `/qr/generate/${ticketId}`
  );

  return response.data;
};

export const verifyQR = async (ticketId) => {
  const response = await API.post(
    "/qr/verify",
    {
      ticketId,
    }
  );

  return response.data;
};