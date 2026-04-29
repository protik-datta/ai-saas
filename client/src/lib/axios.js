import axios from "axios";
import { showError } from "../utils/toast";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Global response interceptor — handles auth expiry + network errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Session expired — redirect to login (avoid redirect loops)
      if (window.location.pathname !== "/login") {
        showError("Session expired. Please log in again.");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
