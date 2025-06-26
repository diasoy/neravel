"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import authServices from "@/services/auth.service";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  const logout = async () => {
    try {
      if (session?.accessToken) {
        await authServices.logout();
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    }
  };

  const redirectToLogin = () => {
    router.push("/auth/login");
  };

  const redirectToDashboard = () => {
    router.push("/dashboard");
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
