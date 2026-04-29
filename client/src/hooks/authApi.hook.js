import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteAccount,
  forgetPassword,
  getMe,
  loginUser,
  logoutUser,
  registerUser,
  resendOtp,
  resetPassword,
  verifyOtp,
} from "../services/authApi";
import {
  clearAllHistory,
  deleteHistoryByTool,
  deleteHistoryItem,
  getHistory,
} from "../services/toolsApi";

// --- GET CURRENT USER ---
export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
};

// --- REGISTER ---
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

// --- LOGIN ---
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

// --- LOGOUT ---
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["me"] });
    },
  });
};

// --- VERIFY OTP ---
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtp,
  });
};

// --- RESEND OTP ---
export const useResendOtp = () => {
  return useMutation({
    mutationFn: resendOtp,
  });
};

// --- FORGET PASSWORD ---
export const useForgetPassword = () => {
  return useMutation({
    mutationFn: forgetPassword,
  });
};

// --- RESET PASSWORD ---
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, data }) => resetPassword(token, data),
  });
};

// --- DELETE ACCOUNT ---
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

// --- GET HISTORY ---
export const useGetHistory = (params = {}) => {
  return useQuery({
    queryKey: ["history", params],
    queryFn: () => getHistory(params),
    staleTime: 2 * 60 * 1000,
  });
};

// --- DELETE HISTORY PER ONE ITEM ---
export const useDeleteHistoryItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteHistoryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
};

// --- CLEAR ALL HISTORY ---
export const useClearAllHistory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearAllHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
};

// --- DELETE HISTORY BY TOOL ---
export const useDeleteHistoryByTool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteHistoryByTool,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
};
