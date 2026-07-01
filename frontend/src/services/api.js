import axios from "axios";

const API = axios.create({
  baseURL: "https://event-management-system-p1cp.onrender.com/api",
});

// Automatically attach JWT token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;