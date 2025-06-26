"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PageLoader } from "@/components/ui/loading";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, redirectToLogin } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirectToLogin();
    }
  }, [isAuthenticated, isLoading, redirectToLogin]);

  if (isLoading) {
    return (
      <PageLoader
        text="Memverifikasi akses..."
        subtitle="Mohon tunggu sebentar"
      />
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
