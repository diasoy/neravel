"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

async function postLogin(credentials) {
  const res = await fetch("http://laravel-api.test/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login gagal.");
  }

  return res.json();
}

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.access_token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      router.push("/dashboard");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login ke Akun Anda</CardTitle>
          <CardDescription>
            Masukkan email Anda di bawah untuk masuk ke akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending} // Nonaktifkan input saat loading
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending} // Nonaktifkan input saat loading
                />
              </div>
              {isError && ( // Tampilkan error jika ada
                <div className="text-red-500 text-sm text-center">
                  {error?.message || "Terjadi kesalahan saat login."}
                </div>
              )}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full hover:cursor-pointer"
                  disabled={isPending}
                >
                  {isPending ? "Loading..." : "Login"}{" "}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Belum punya akun?{" "}
              <a href="/register" className="underline underline-offset-4">
                Daftar
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
