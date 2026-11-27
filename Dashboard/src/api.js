import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://national-engg-works.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem("apex_dashboard_user");
    if (stored) {
      const user = JSON.parse(stored);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
  } catch (e) {
    // ignore
  }
  return config;
});

export default api;
