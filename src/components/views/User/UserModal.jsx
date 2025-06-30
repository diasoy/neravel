"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LoadingSpinner } from "@/components/ui/loading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function UserModal({
  isOpen,
  onClose,
  onSubmit,
  user = null,
  isLoading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    is_active: true,
    password: "",
    password_confirmation: "",
  });

  const isEdit = !!user;

  const roles = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
        is_active: user.is_active !== undefined ? user.is_active : true,
        password: "",
        password_confirmation: "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "user",
        is_active: true,
        password: "",
        password_confirmation: "",
      });
    }
  }, [user, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert("Nama user harus diisi");
      return;
    }

    if (!formData.email.trim()) {
      alert("Email harus diisi");
      return;
    }

    if (!isEdit && !formData.password) {
      alert("Password harus diisi untuk user baru");
      return;
    }

    if (!isEdit && formData.password !== formData.password_confirmation) {
      alert("Konfirmasi password tidak cocok");
      return;
    }

    // Prepare data for submission
    const submitData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      is_active: formData.is_active,
    };

    // Only include password for new users or when password is provided for existing users
    if (!isEdit || formData.password) {
      submitData.password = formData.password;
      submitData.password_confirmation = formData.password_confirmation;
    }

    onSubmit(submitData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRoleSelect = (roleValue) => {
    handleChange("role", roleValue);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit User" : "Tambah User Baru"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Ubah informasi user yang dipilih."
              : "Buat user baru untuk sistem Anda."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama User *</Label>
            <Input
              id="name"
              placeholder="Masukkan nama user"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Masukkan email user"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  disabled={isLoading}
                >
                  {roles.find((role) => role.value === formData.role)?.label ||
                    "Pilih Role"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {roles.map((role) => (
                  <DropdownMenuItem
                    key={role.value}
                    onClick={() => handleRoleSelect(role.value)}
                  >
                    {role.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              {isEdit
                ? "Password Baru (Kosongkan jika tidak diubah)"
                : "Password *"}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required={!isEdit}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password_confirmation">
              {isEdit ? "Konfirmasi Password Baru" : "Konfirmasi Password *"}
            </Label>
            <Input
              id="password_confirmation"
              type="password"
              placeholder="Konfirmasi password"
              value={formData.password_confirmation}
              onChange={(e) =>
                handleChange("password_confirmation", e.target.value)
              }
              required={!isEdit || formData.password}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => handleChange("is_active", checked)}
              disabled={isLoading}
            />
            <Label htmlFor="is_active">User Aktif</Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <LoadingSpinner size="small" text="" />
                  <span>{isEdit ? "Menyimpan..." : "Membuat..."}</span>
                </div>
              ) : isEdit ? (
                "Simpan Perubahan"
              ) : (
                "Buat User"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
