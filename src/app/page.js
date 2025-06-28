import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full mx-auto text-center px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Selamat Datang
          </h1>
          <p className="text-gray-600 mb-8">
            Silakan masuk ke akun Anda atau daftar untuk memulai
          </p>

          <div className="space-y-4">
            <Link href="/auth/login" className="block">
              <Button className="w-full" size="lg">
                Masuk
              </Button>
            </Link>

            <Link href="/auth/register" className="block">
              <Button variant="outline" className="w-full" size="lg">
                Daftar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
