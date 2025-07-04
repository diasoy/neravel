"use client";

import { useEffect, useCallback } from "react";
import TitleContent from "@/components/dashboard/TitleContent";
import { DataTable } from "@/components/ui/data-table";
import { CategoryModal } from "@/components/views/Category/CategoryModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useDebounce from "@/hooks/useDebounce";
import categoriesService from "@/services/categories.service";
import { useToast } from "@/hooks/useToast";
import useCategoryStore from "@/store/categoryStore";

const CategoriesPage = () => {
  const { crud, loading, status } = useToast();

  // Zustand store
  const {
    categories,
    pagination,
    isLoading,
    searchTerm,
    isModalOpen,
    selectedCategory,
    isSubmitting,
    viewCategory,
    setCategories,
    setPagination,
    setIsLoading,
    setSearchTerm,
    setIsSubmitting,
    openModal,
    closeModal,
    openViewModal,
    closeViewModal,
    fetchCategories,
    deleteCategory,
    restoreCategory,
    toggleCategoryStatus,
    fetchCategoryDetail,
  } = useCategoryStore();

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch categories on component mount and search term change
  useEffect(() => {
    fetchCategories(1, debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchCategories]);

  // Handler functions
  const handlePageChange = useCallback(
    (page) => {
      fetchCategories(page, searchTerm);
    },
    [fetchCategories, searchTerm]
  );

  const handleSearch = useCallback(
    (term) => {
      setSearchTerm(term);
    },
    [setSearchTerm]
  );

  const handleAddCategory = useCallback(() => {
    openModal();
  }, [openModal]);

  const handleEditCategory = useCallback(
    (category) => {
      openModal(category);
    },
    [openModal]
  );

  const handleViewCategory = useCallback(
    async (category) => {
      const categoryDetail = await fetchCategoryDetail(category.id);
      if (!categoryDetail) {
        crud.error("Gagal memuat detail kategori");
      }
    },
    [fetchCategoryDetail, crud]
  );

  const handleDeleteCategory = useCallback(
    async (category) => {
      if (
        window.confirm(
          `Apakah Anda yakin ingin menghapus kategori "${category.name}"?`
        )
      ) {
        const success = await deleteCategory(category.id);
        if (success) {
          crud.success("Kategori berhasil dihapus");
        } else {
          crud.error("Gagal menghapus kategori");
        }
      }
    },
    [deleteCategory, crud]
  );

  const handleRestoreCategory = useCallback(
    async (category) => {
      if (
        window.confirm(
          `Apakah Anda yakin ingin mengembalikan kategori "${category.name}"?`
        )
      ) {
        const success = await restoreCategory(category.id);
        if (success) {
          crud.success("Kategori berhasil dikembalikan");
        } else {
          crud.error("Gagal mengembalikan kategori");
        }
      }
    },
    [restoreCategory, crud]
  );

  const handleToggleStatus = useCallback(
    async (category) => {
      const action = category.is_active ? "menonaktifkan" : "mengaktifkan";
      if (
        window.confirm(
          `Apakah Anda yakin ingin ${action} kategori "${category.name}"?`
        )
      ) {
        const success = await toggleCategoryStatus(category.id);
        if (success) {
          crud.success(
            `Kategori berhasil ${
              category.is_active ? "dinonaktifkan" : "diaktifkan"
            }`
          );
        } else {
          crud.error(`Gagal ${action} kategori`);
        }
      }
    },
    [toggleCategoryStatus, crud]
  );

  const handleFormSubmit = useCallback(
    async (formData) => {
      setIsSubmitting(true);
      try {
        if (selectedCategory) {
          // Update category
          await categoriesService.update(selectedCategory.id, formData);
          crud.success("Kategori berhasil diperbarui");
        } else {
          // Create category
          await categoriesService.create(formData);
          crud.success("Kategori berhasil ditambahkan");
        }

        closeModal();
        fetchCategories(pagination.current_page || 1, searchTerm);
      } catch (error) {
        crud.error(
          selectedCategory
            ? "Gagal memperbarui kategori"
            : "Gagal menambahkan kategori"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      selectedCategory,
      setIsSubmitting,
      crud,
      closeModal,
      fetchCategories,
      pagination.current_page,
      searchTerm,
    ]
  );

  // Columns configuration untuk data table
  const columns = [
    {
      header: "No",
      accessor: "no",
      render: (item, index) => {
        const currentPage = pagination.current_page || 1;
        const perPage = pagination.per_page || 8;
        return (currentPage - 1) * perPage + index + 1;
      },
    },
    {
      header: "Nama Kategori",
      accessor: "name",
      render: (item) => (
        <div>
          <div className="font-medium">{item.name}</div>
          <div className="text-sm text-gray-500 truncate max-w-xs">
            {item.description || "Tidak ada deskripsi"}
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "is_active",
      render: (item) => (
        <Badge variant={item.is_active ? "success" : "destructive"}>
          {item.is_active ? "Aktif" : "Tidak Aktif"}
        </Badge>
      ),
    },
    {
      header: "Dibuat",
      accessor: "created_at",
      render: (item) => {
        const date = new Date(item.created_at);
        return (
          <div className="text-sm">
            <div>{date.toLocaleDateString("id-ID")}</div>
            <div className="text-gray-500">
              {date.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        );
      },
    },
    {
      header: "Terakhir Update",
      accessor: "updated_at",
      render: (item) => {
        const date = new Date(item.updated_at);
        return (
          <div className="text-sm">
            <div>{date.toLocaleDateString("id-ID")}</div>
            <div className="text-gray-500">
              {date.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <TitleContent
        title="Categories"
        description="Kelola kategori produk Anda"
      />

      <DataTable
        title="Daftar Kategori"
        description={`Total ${pagination.total || 0} kategori`}
        data={categories}
        columns={columns}
        pagination={pagination}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onAdd={handleAddCategory}
        onView={handleViewCategory}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
        onRestore={handleRestoreCategory}
        onToggleStatus={handleToggleStatus}
        searchPlaceholder="Cari nama kategori..."
        searchValue={searchTerm}
        addButtonText="Tambah Kategori"
      />

      {/* Add/Edit Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        category={selectedCategory}
        isLoading={isSubmitting}
      />

      {/* Detail View Modal */}
      {viewCategory && (
        <Dialog open={!!viewCategory} onOpenChange={closeViewModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Detail Kategori</DialogTitle>
              <DialogDescription>
                Informasi lengkap kategori {viewCategory.name}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold">Nama Kategori</Label>
                <p className="text-sm text-gray-600">{viewCategory.name}</p>
              </div>

              <div>
                <Label className="text-sm font-semibold">Deskripsi</Label>
                <p className="text-sm text-gray-600">
                  {viewCategory.description || "Tidak ada deskripsi"}
                </p>
              </div>

              <div>
                <Label className="text-sm font-semibold">Status</Label>
                <div className="mt-1">
                  <Badge
                    variant={viewCategory.is_active ? "success" : "destructive"}
                  >
                    {viewCategory.is_active ? "Aktif" : "Tidak Aktif"}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold">Dibuat</Label>
                  <p className="text-sm text-gray-600">
                    {new Date(viewCategory.created_at).toLocaleDateString(
                      "id-ID"
                    )}{" "}
                    {new Date(viewCategory.created_at)
                      .toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                      .replace(".", ":")}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-semibold">
                    Terakhir Update
                  </Label>
                  <p className="text-sm text-gray-600">
                    {new Date(viewCategory.updated_at).toLocaleDateString(
                      "id-ID"
                    )}{" "}
                    {new Date(viewCategory.updated_at)
                      .toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                      .replace(".", ":")}
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={closeViewModal}>
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CategoriesPage;
