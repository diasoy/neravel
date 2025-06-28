"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/loading";

export function PublicRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.replace("/dashboard");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <LoadingSpinner text="Memuat..." />;
  }

  if (status === "authenticated" && session) {
    return <LoadingSpinner text="Mengalihkan ke dashboard..." />;
  }

  return children;
}
