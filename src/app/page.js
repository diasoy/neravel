"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex justify-between items-center mb-6 p-4 bg-gray-100 rounded-lg">
        <h1 className="text-2xl font-bold">Next.js + Laravel Auth</h1>
        <div className="flex gap-2">
          {status === "loading" ? (
            <div>Loading...</div>
          ) : session ? (
            <>
              <span className="text-sm text-gray-600 flex items-center mr-3">
                Halo, {session.user?.name}
              </span>
              <Link href="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button
                  className="hover:cursor-pointer"
                  size="sm"
                  variant="outline"
                >
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="hover:cursor-pointer" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
