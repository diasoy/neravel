"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 text-6xl">⚠️</div>
            <CardTitle className="text-2xl font-bold text-red-600">
              Oops! Terjadi Kesalahan
            </CardTitle>
            <CardDescription>
              Terjadi kesalahan yang tidak terduga pada aplikasi.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-gray-600">
              <p>Kami mohon maaf atas ketidaknyamanan ini.</p>
              <p>Tim kami akan segera memperbaiki masalah ini.</p>
            </div>

            {process.env.NODE_ENV === "development" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-xs text-red-600 font-mono break-all">
                  {error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Button onClick={reset} className="w-full">
                🔄 Coba Lagi
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => (window.location.href = "/")}
              >
                🏠 Kembali ke Beranda
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Error ID: {Date.now().toString(36)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
