"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { useState } from "react";

export default function ClientProviders({ children, session }) {
  // Create QueryClient in component state to avoid SSR issues
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
          },
        },
      })
  );

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" expand={true} richColors closeButton />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
