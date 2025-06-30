"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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

const CategoriesPage = ({ setTitleHeader }) => {
  const { crud, loading } = useToast();
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detail view state
  const [viewCategory, setViewCategory] = useState(null);

  // Refs untuk mencegah multiple calls
  const isInitialMount = useRef(true);
  const abortControllerRef = useRef(null);

  // Debounce search term dengan delay 1 detik
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  // Columns configuration untuk data table
  const columns = [
    {
      header: "No",
      accessor: "no",
      render: (item, index) => {
        // Hitung nomor berdasarkan halaman dan index
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

  const loadCategories = useCallback(async (page = 1, search = "") => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setIsLoading(true);
      const params = {
        page,
        ...(search && { search }),
      };

      const response = await categoriesService.getCategories(params, {
        signal: abortControllerRef.current.signal,
      });

      if (response.data.success) {
        setCategories(response.data.data.data);
        setPagination({
          current_page: response.data.data.current_page,
          last_page: response.data.data.last_page,
          from: response.data.data.from,
          to: response.data.data.to,
          total: response.data.data.total,
          per_page: response.data.data.per_page,
        });
      }
    } catch (error) {
      if (error.code === "ERR_CANCELED" || error.name === "CanceledError") {
        return;
      }

      loading.fetchError("Kategori");
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  const handlePageChange = useCallback(
    (page) => {
      loadCategories(page, debouncedSearchTerm);
    },
    [loadCategories, debouncedSearchTerm]
  );

  const handleSearch = useCallback((search) => {
    setSearchTerm(search);
  }, []);

  const handleAddCategory = useCallback(() => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  }, []);

  const handleViewCategory = useCallback(async (category) => {
    try {
      const response = await categoriesService.getCategory(category.id);
      if (response.data.success) {
        setViewCategory(response.data.data);
      }
    } catch (error) {
      loading.fetchError("Detail Kategori");
    }
  }, []);

  const handleEditCategory = useCallback((category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  }, []);

  const handleDeleteCategory = useCallback(
    async (category) => {
      if (
        confirm(
          `Apakah Anda yakin ingin menghapus kategori "${category.name}"?`
        )
      ) {
        try {
          await categoriesService.deleteCategory(category.id);
          crud.deleteSuccess("Kategori");
          loadCategories(pagination.current_page, debouncedSearchTerm);
        } catch (error) {
          crud.deleteError("Kategori");
        }
      }
    },
    [loadCategories, pagination.current_page, debouncedSearchTerm]
  );

  const handleRestoreCategory = useCallback(
    async (category) => {
      try {
        await categoriesService.restoreCategory(category.id);
        crud.restoreSuccess("Kategori");
        loadCategories(pagination.current_page, debouncedSearchTerm);
      } catch (error) {
        crud.restoreError("Kategori");
      }
    },
    [loadCategories, pagination.current_page, debouncedSearchTerm]
  );

  const handleToggleStatus = useCallback(
    async (category) => {
      try {
        await categoriesService.toggleStatus(category.id);
        if (category.is_active) {
          status.deactivated("Kategori");
        } else {
          status.activated("Kategori");
        }
        loadCategories(pagination.current_page, debouncedSearchTerm);
      } catch (error) {
        status.statusChangeError("Kategori");
      }
    },
    [loadCategories, pagination.current_page, debouncedSearchTerm]
  );

  const handleFormSubmit = useCallback(
    async (formData) => {
      try {
        setIsSubmitting(true);

        if (selectedCategory) {
          await categoriesService.updateCategory(selectedCategory.id, formData);
          crud.updateSuccess("Kategori");
        } else {
          await categoriesService.createCategory(formData);
          crud.createSuccess("Kategori");
        }

        setIsModalOpen(false);
        loadCategories(pagination.current_page, debouncedSearchTerm);
      } catch (error) {
        if (selectedCategory) {
          crud.updateError("Kategori");
        } else {
          crud.createError("Kategori");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      selectedCategory,
      loadCategories,
      pagination.current_page,
      debouncedSearchTerm,
    ]
  );

  useEffect(() => {
    if (isInitialMount.current) {
      loadCategories();
      isInitialMount.current = false;
    }
  }, [loadCategories]);

  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }

    if (debouncedSearchTerm !== undefined) {
      loadCategories(1, debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, loadCategories]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

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
        addButtonText="Tambah Kategori"
        searchValue={searchTerm}
      />

      {/* Add/Edit Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        category={selectedCategory}
        isLoading={isSubmitting}
      />

      {/* Detail View Modal */}
      {viewCategory && (
        <Dialog
          open={!!viewCategory}
          onOpenChange={() => setViewCategory(null)}
        >
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
              <Button variant="outline" onClick={() => setViewCategory(null)}>
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
