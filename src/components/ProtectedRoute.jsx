"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/loading";

export function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.replace("/auth/login");
      return;
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <LoadingSpinner
        text="Memuat halaman..."
        subtitle="Mohon tunggu sebentar"
      />
    );
  }

  if (status === "unauthenticated") {
    return (
      <LoadingSpinner
        text="Mengalihkan ke halaman login..."
        subtitle="Anda akan dialihkan secara otomatis"
      />
    );
  }

  if (status === "authenticated" && session) {
    return children;
  }

  return <LoadingSpinner text="Memuat..." />;
}
