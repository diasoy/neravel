"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import { toast } from "sonner";

// Query Keys
export const authKeys = {
  all: ["auth"],
  user: () => [...authKeys.all, "user"],
};

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  const logout = async () => {
    try {
      if (session?.accessToken) {
        await authService.logout();
      }
    } catch (error) {
      console.warn("Backend logout failed:", error);
    }

    try {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const redirectToLogin = () => {
    router.push("/auth/login");
    toast.info("Please login to continue");
  };

  const redirectToDashboard = () => {
    router.push("/dashboard");
    toast.success(`Welcome back, ${user?.name}!`);
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    logout,
    redirectToLogin,
    redirectToDashboard,
    session,
  };
}

// Hook untuk get user dari API (data tambahan dari backend)
export const useCurrentUser = (enabled = true) => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: authKeys.user(),
    queryFn: authService.getCurrentUser,
    enabled: enabled && isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Hook untuk login
export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      const result = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      toast.success("Login successful");
    },
    onError: (error) => {
      const message = error.message || "Login failed";
      toast.error(message);
    },
  });
};

// Hook untuk logout menggunakan React Query
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Clear React Query cache
      queryClient.clear();

      // Optional: call backend logout
      try {
        await authService.logout();
      } catch (error) {
        console.warn("Backend logout failed:", error);
      }

      // NextAuth signOut
      await signOut({ redirect: false });
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
    },
    onError: (error) => {
      const message = error.message || "Logout failed";
      toast.error(message);
    },
  });
};

// Hook untuk register
export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      toast.success(data?.message || "Registration successful");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      toast.error(message);
    },
  });
};

// Hook untuk forgot password
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (data) => {
      toast.success(data?.message || "Password reset email sent");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to send reset email";
      toast.error(message);
    },
  });
};

// Hook untuk reset password
export const useResetPassword = () => {
  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: (data) => {
      toast.success(data?.message || "Password reset successful");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Password reset failed";
      toast.error(message);
    },
  });
};
