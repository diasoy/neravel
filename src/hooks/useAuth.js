"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import authServices from "@/services/auth.service";
import { useToast } from "@/hooks/useToast";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { auth } = useToast();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  const logout = async () => {
    try {
      if (session?.accessToken) {
        await authServices.logout();
      }
    } catch (error) {
      auth.logoutError();
      return;
    }

    try {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
      auth.logoutSuccess();
    } catch (error) {
      auth.logoutError();
    }
  };

  const redirectToLogin = () => {
    router.push("/auth/login");
    auth.sessionExpired();
  };

  const redirectToDashboard = () => {
    router.push("/dashboard");
    auth.loginSuccess(user?.name);
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
