import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 text-6xl">🔍</div>
            <CardTitle className="text-2xl font-bold">
              404 - Halaman Tidak Ditemukan
            </CardTitle>
            <CardDescription>
              Maaf, halaman yang Anda cari tidak dapat ditemukan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-gray-600">
              <p>Halaman mungkin telah dipindahkan, dihapus, atau</p>
              <p>Anda mungkin salah mengetik alamat URL.</p>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/">
                <Button className="w-full">🏠 Kembali ke Beranda</Button>
              </Link>

              <Link href="/dashboard">
                <Button variant="outline" className="w-full">
                  📊 Pergi ke Dashboard
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Jika masalah berlanjut, silakan hubungi dukungan.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
