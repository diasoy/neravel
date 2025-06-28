"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/useToast";

export default function ToastDemoPage() {
  const {
    auth,
    crud,
    status,
    loading,
    validation,
    file,
    system,
    confirm,
    batch,
    permission,
    realtime,
  } = useToast();

  const [testInput, setTestInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate async operations
  const simulateAsyncOperation = async (duration = 2000) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setIsLoading(false);
        Math.random() > 0.3 ? resolve("Success!") : reject(new Error("Failed"));
      }, duration);
    });
  };

  const handleTestValidation = () => {
    if (!testInput) {
      validation.required("Test Input");
      return;
    }
    if (testInput.length < 3) {
      validation.tooShort("Test Input", 3);
      return;
    }
    if (testInput.length > 10) {
      validation.tooLong("Test Input", 10);
      return;
    }
    system.success("Validasi Berhasil", "Input Anda valid!");
  };

  const handlePromiseToast = () => {
    const promise = simulateAsyncOperation(3000);
    system.promise(promise, {
      loading: "Sedang memproses data...",
      success: "Data berhasil diproses!",
      error: "Gagal memproses data",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Toast Notification Demo
        </h1>
        <p className="text-gray-600">
          Demonstrasi semua jenis notifikasi toast yang tersedia dalam aplikasi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Authentication Toasts */}
        <Card>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>Toast untuk autentikasi pengguna</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => auth.loginSuccess("John Doe")}
              className="w-full"
              variant="default"
            >
              Login Success
            </Button>
            <Button
              onClick={() => auth.loginError("Email atau password salah")}
              className="w-full"
              variant="destructive"
            >
              Login Error
            </Button>
            <Button
              onClick={() => auth.registerSuccess()}
              className="w-full"
              variant="default"
            >
              Register Success
            </Button>
            <Button
              onClick={() => auth.logoutSuccess()}
              className="w-full"
              variant="outline"
            >
              Logout Success
            </Button>
            <Button
              onClick={() => auth.sessionExpired()}
              className="w-full"
              variant="secondary"
            >
              Session Expired
            </Button>
          </CardContent>
        </Card>

        {/* CRUD Operations */}
        <Card>
          <CardHeader>
            <CardTitle>CRUD Operations</CardTitle>
            <CardDescription>
              Toast untuk operasi Create, Read, Update, Delete
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => crud.createSuccess("Produk")}
              className="w-full"
              variant="default"
            >
              Create Success
            </Button>
            <Button
              onClick={() => crud.updateSuccess("Kategori")}
              className="w-full"
              variant="default"
            >
              Update Success
            </Button>
            <Button
              onClick={() => crud.deleteSuccess("User")}
              className="w-full"
              variant="destructive"
            >
              Delete Success
            </Button>
            <Button
              onClick={() => crud.restoreSuccess("Data")}
              className="w-full"
              variant="outline"
            >
              Restore Success
            </Button>
            <Button
              onClick={() => crud.createError("Produk")}
              className="w-full"
              variant="destructive"
            >
              Create Error
            </Button>
          </CardContent>
        </Card>

        {/* Status Operations */}
        <Card>
          <CardHeader>
            <CardTitle>Status Operations</CardTitle>
            <CardDescription>Toast untuk perubahan status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => status.activated("Kategori")}
              className="w-full"
              variant="default"
            >
              Activated
            </Button>
            <Button
              onClick={() => status.deactivated("User")}
              className="w-full"
              variant="secondary"
            >
              Deactivated
            </Button>
            <Button
              onClick={() => status.statusChangeError("Produk")}
              className="w-full"
              variant="destructive"
            >
              Status Change Error
            </Button>
          </CardContent>
        </Card>

        {/* Loading & Errors */}
        <Card>
          <CardHeader>
            <CardTitle>Loading & Errors</CardTitle>
            <CardDescription>
              Toast untuk loading dan error handling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => loading.fetchError("Data Kategori")}
              className="w-full"
              variant="destructive"
            >
              Fetch Error
            </Button>
            <Button
              onClick={() => loading.networkError()}
              className="w-full"
              variant="destructive"
            >
              Network Error
            </Button>
            <Button
              onClick={() => loading.serverError()}
              className="w-full"
              variant="destructive"
            >
              Server Error
            </Button>
          </CardContent>
        </Card>

        {/* File Operations */}
        <Card>
          <CardHeader>
            <CardTitle>File Operations</CardTitle>
            <CardDescription>Toast untuk operasi file</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => file.uploadSuccess("document.pdf")}
              className="w-full"
              variant="default"
            >
              Upload Success
            </Button>
            <Button
              onClick={() => file.uploadError("image.jpg")}
              className="w-full"
              variant="destructive"
            >
              Upload Error
            </Button>
            <Button
              onClick={() => file.fileTooBig("5MB")}
              className="w-full"
              variant="destructive"
            >
              File Too Big
            </Button>
            <Button
              onClick={() => file.invalidFileType("PDF, DOCX")}
              className="w-full"
              variant="destructive"
            >
              Invalid File Type
            </Button>
          </CardContent>
        </Card>

        {/* Validation */}
        <Card>
          <CardHeader>
            <CardTitle>Form Validation</CardTitle>
            <CardDescription>Toast untuk validasi input form</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="testInput">Test Input</Label>
              <Input
                id="testInput"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="Masukkan 3-10 karakter"
              />
            </div>
            <Button
              onClick={handleTestValidation}
              className="w-full"
              variant="outline"
            >
              Test Validation
            </Button>
            <Button
              onClick={() => validation.invalid("Email")}
              className="w-full"
              variant="destructive"
            >
              Invalid Format
            </Button>
            <Button
              onClick={() => validation.mismatch("Password Confirmation")}
              className="w-full"
              variant="destructive"
            >
              Input Mismatch
            </Button>
          </CardContent>
        </Card>

        {/* Batch Operations */}
        <Card>
          <CardHeader>
            <CardTitle>Batch Operations</CardTitle>
            <CardDescription>Toast untuk operasi massal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => batch.deleteSuccess(5, "kategori")}
              className="w-full"
              variant="destructive"
            >
              Batch Delete Success
            </Button>
            <Button
              onClick={() => batch.exportSuccess("Data Produk", "Excel")}
              className="w-full"
              variant="default"
            >
              Export Success
            </Button>
            <Button
              onClick={() => batch.importSuccess(25, "produk")}
              className="w-full"
              variant="default"
            >
              Import Success
            </Button>
            <Button
              onClick={() =>
                batch.importError(["Baris 5: Format tanggal salah"])
              }
              className="w-full"
              variant="destructive"
            >
              Import Error
            </Button>
          </CardContent>
        </Card>

        {/* Real-time Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Real-time Updates</CardTitle>
            <CardDescription>Toast untuk update real-time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => realtime.newMessage("Admin")}
              className="w-full"
              variant="default"
            >
              New Message
            </Button>
            <Button
              onClick={() => realtime.dataUpdated("Kategori")}
              className="w-full"
              variant="outline"
            >
              Data Updated
            </Button>
            <Button
              onClick={() =>
                realtime.notification(
                  "Sistem Maintenance",
                  "Sistem akan maintenance pada 02:00"
                )
              }
              className="w-full"
              variant="secondary"
            >
              System Notification
            </Button>
          </CardContent>
        </Card>

        {/* Advanced System Toasts */}
        <Card>
          <CardHeader>
            <CardTitle>Advanced System</CardTitle>
            <CardDescription>Toast lanjutan untuk sistem</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={handlePromiseToast}
              className="w-full"
              variant="outline"
              disabled={isLoading}
            >
              Promise Toast
            </Button>
            <Button
              onClick={() =>
                system.richContent(
                  "🎉 Selamat!",
                  "Anda telah menyelesaikan tutorial",
                  "🏆"
                )
              }
              className="w-full"
              variant="default"
            >
              Rich Content
            </Button>
            <Button
              onClick={() =>
                system.custom("Custom Toast", {
                  duration: 10000,
                  style: {
                    background:
                      "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                  },
                })
              }
              className="w-full"
              variant="outline"
            >
              Custom Styled
            </Button>
            <Button
              onClick={() => {
                const loadingToast = system.loading("Processing...");
                setTimeout(() => system.dismiss(loadingToast), 3000);
              }}
              className="w-full"
              variant="secondary"
            >
              Manual Dismiss
            </Button>
          </CardContent>
        </Card>

        {/* Permission Toasts */}
        <Card>
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
            <CardDescription>Toast untuk manajemen izin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => permission.accessDenied("halaman admin")}
              className="w-full"
              variant="destructive"
            >
              Access Denied
            </Button>
            <Button
              onClick={() => permission.roleChanged("Administrator")}
              className="w-full"
              variant="outline"
            >
              Role Changed
            </Button>
            <Button
              onClick={() =>
                permission.permissionGranted("akses penuh ke dashboard")
              }
              className="w-full"
              variant="default"
            >
              Permission Granted
            </Button>
          </CardContent>
        </Card>

        {/* Confirmation Toasts */}
        <Card>
          <CardHeader>
            <CardTitle>Confirmations</CardTitle>
            <CardDescription>Toast dengan aksi konfirmasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() =>
                confirm.deleteConfirm(
                  "kategori ini",
                  () => system.success("Deleted!", "Item berhasil dihapus"),
                  () => system.info("Cancelled", "Penghapusan dibatalkan")
                )
              }
              className="w-full"
              variant="destructive"
            >
              Delete Confirmation
            </Button>
            <Button
              onClick={() =>
                confirm.logoutConfirm(
                  () => auth.logoutSuccess(),
                  () =>
                    system.info("Tetap Login", "Anda tetap berada di aplikasi")
                )
              }
              className="w-full"
              variant="outline"
            >
              Logout Confirmation
            </Button>
            <Button
              onClick={() =>
                confirm.statusToggleConfirm(
                  "kategori",
                  true,
                  () => status.activated("Kategori"),
                  () => system.info("Dibatalkan", "Status tidak diubah")
                )
              }
              className="w-full"
              variant="secondary"
            >
              Status Toggle Confirm
            </Button>
          </CardContent>
        </Card>

        {/* Utility Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Utility Actions</CardTitle>
            <CardDescription>Aksi utilitas untuk toast</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => system.dismissAll()}
              className="w-full"
              variant="outline"
            >
              Dismiss All Toasts
            </Button>
            <Button
              onClick={() => {
                system.info("Info 1");
                system.success("Success 1");
                system.warning("Warning 1");
                system.error("Error 1");
              }}
              className="w-full"
              variant="secondary"
            >
              Show Multiple Toasts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
