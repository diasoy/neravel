"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { useToast } from "@/hooks/useToast";
import authServices from "@/services/auth.service";
import { LoadingSpinner } from "@/components/ui/loading";

export function RegisterForm({ className, ...props }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { auth, validation } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    if (!formData.name) {
      validation.required("Nama");
      setIsPending(false);
      return;
    }
    if (!formData.email) {
      validation.required("Email");
      setIsPending(false);
      return;
    }
    if (!formData.password) {
      validation.required("Password");
      setIsPending(false);
      return;
    }
    if (formData.password.length < 8) {
      validation.tooShort("Password", 8);
      setIsPending(false);
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      validation.mismatch("Konfirmasi Password");
      setIsPending(false);
      return;
    }

    try {
      const response = await authServices.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });

      auth.registerSuccess();
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan saat registrasi";
      auth.registerError(errorMessage);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Daftar Akun Baru</CardTitle>
            <CardDescription>
              Masukkan data Anda di bawah untuk membuat akun baru
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Nama</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nama Lengkap"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isPending}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isPending}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isPending}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  </div>
                  <Input
                    id="confirmPassword"
                    name="password_confirmation"
                    type="password"
                    placeholder="********"
                    required
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    disabled={isPending}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full hover:cursor-pointer"
                    disabled={isPending}
                  >
                    {isPending ? <LoadingSpinner /> : "Daftar"}
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Sudah punya akun?{" "}
                <a href="/auth/login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
