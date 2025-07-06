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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { LoadingSpinner } from "@/components/ui/loading";
import { useCreateCategory, useUpdateCategory } from "@/hooks/useCategories";

export function CategoryModal({
  isOpen,
  onClose,
  category = null,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_active: true,
  });

  const isEdit = !!category;
  
  // React Query mutations
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  
  const isLoading = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        is_active: category.is_active || false,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        is_active: true,
      });
    }
  }, [category, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ 
          id: category.id, 
          data: formData 
        });
      } else {
        await createMutation.mutateAsync(formData);
      }
      
      onSuccess?.();
    } catch (error) {
      // Error handled by mutations
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Kategori" : "Tambah Kategori Baru"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Ubah informasi kategori yang dipilih."
              : "Buat kategori baru untuk produk Anda."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Kategori *</Label>
            <Input
              id="name"
              placeholder="Masukkan nama kategori"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              placeholder="Masukkan deskripsi kategori"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              disabled={isLoading}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => handleChange("is_active", checked)}
              disabled={isLoading}
            />
            <Label htmlFor="is_active">Kategori Aktif</Label>
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
                "Buat Kategori"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}