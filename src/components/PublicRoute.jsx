"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PageLoader } from "@/components/ui/loading";

export function PublicRoute({ children, redirectIfAuthenticated = true }) {
  const { isAuthenticated, isLoading, redirectToDashboard } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated && redirectIfAuthenticated) {
      redirectToDashboard();
    }
  }, [
    isAuthenticated,
    isLoading,
    redirectToDashboard,
    redirectIfAuthenticated,
  ]);

  if (isLoading) {
    return (
      <PageLoader
        text="Memeriksa status login..."
        subtitle="Mohon tunggu sebentar"
      />
    );
  }

  if (isAuthenticated && redirectIfAuthenticated) {
    return null; 
  }

  return children;
}
