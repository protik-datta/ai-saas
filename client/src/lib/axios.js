import axios from "axios";
import { showError } from "../utils/toast";

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL && import.meta.env.PROD) {
  console.warn("VITE_API_URL is not defined in production environment.");
}

export const axiosInstance = axios.create({
  baseURL: baseURL || "http://localhost:5001/api/v1",
  withCredentials: true,
});

// Global response interceptor — handles auth expiry + network errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const currentPath = window.location.pathname;

    const protectedRoutes = ["/dashboard"];

    const isProtectedRoute = protectedRoutes.some((route) =>
      currentPath.startsWith(route),
    );

    if (status === 401 && isProtectedRoute) {
      showError("Session expired. Please log in again.");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
