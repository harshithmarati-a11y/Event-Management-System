import API from "./api";

// Create Event
export const createEvent = async (formData) => {
  const response = await API.post("/events", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Get All Events
export const getEvents = async () => {
  const response = await API.get("/events");
  return response.data;
};

// Get Single Event
export const getEvent = async (id) => {
  const response = await API.get(`/events/${id}`);
  return response.data;
};

// Update Event
export const updateEvent = async (id, formData) => {
  const response = await API.put(`/events/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete Event
export const deleteEvent = async (id) => {
  const response = await API.delete(`/events/${id}`);
  return response.data;
};