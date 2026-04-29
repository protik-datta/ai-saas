import { axiosInstance } from "../lib/axios";
import { showError } from "../utils/toast";

// REGISTER
export const registerUser = async (payload) => {
  try {
    const res = await axiosInstance.post("/auth/register", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Registration failed");
    throw error;
  }
};

// VERIFY OTP
export const verifyOtp = async (payload) => {
  try {
    const res = await axiosInstance.post("/auth/verify-otp", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "OTP verification failed");
    throw error;
  }
};

// LOGIN
export const loginUser = async (payload) => {
  try {
    const res = await axiosInstance.post("/auth/login", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Login failed");
    throw error;
  }
};

// GET CURRENT USER
export const getMe = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw error;
    }
    showError(error.response?.data?.message || "Failed to fetch user");
    throw error;
  }
};

// LOGOUT
export const logoutUser = async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Logout failed");
    throw error;
  }
};

// RESEND OTP
export const resendOtp = async (payload) => {
  try {
    const res = await axiosInstance.post("/auth/resend-otp", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to resend OTP");
    throw error;
  }
};

// FORGOT PASSWORD
export const forgetPassword = async (payload) => {
  try {
    const res = await axiosInstance.post("/auth/forget-password", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to send reset email");
    throw error;
  }
};

// RESET PASSWORD
export const resetPassword = async (token, payload) => {
  try {
    const res = await axiosInstance.post(
      `/auth/reset-password/${token}`,
      payload,
    );
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Password reset failed");
    throw error;
  }
};

// DELETE ACCOUNT
export const deleteAccount = async (payload) => {
  try {
    const res = await axiosInstance.delete("/auth/delete", {
      data: payload,
    });
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to delete account");
    throw error;
  }
};
