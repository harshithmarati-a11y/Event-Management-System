import API from "./api";

// Book Ticket
export const bookTicket = async (ticketData) => {
  const response = await API.post("/tickets", ticketData);
  return response.data;
};

// Get All Tickets
export const getTickets = async () => {
  const response = await API.get("/tickets");
  return response.data;
};

// Get Single Ticket
export const getTicket = async (id) => {
  const response = await API.get(`/tickets/${id}`);
  return response.data;
};

// Delete Ticket
export const deleteTicket = async (id) => {
  const response = await API.delete(`/tickets/${id}`);
  return response.data;
};