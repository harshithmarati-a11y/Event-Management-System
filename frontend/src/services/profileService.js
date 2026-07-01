import API from "./api";

// Get Profile
export const getProfile = async (id) => {
  const response = await API.get(`/profile/${id}`);
  return response.data;
};

// Update Profile
export const updateProfile = async (id, formData) => {
  const response = await API.put(`/profile/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};