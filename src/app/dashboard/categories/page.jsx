"use client";

import { useState, useMemo } from "react";
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
import {
  useCategories,
  useDeleteCategory,
  useToggleCategoryStatus,
  useRestoreCategory,
} from "@/hooks/useCategories";
import useDebounce from "@/hooks/useDebounce";
import useCategoryStore from "@/store/categoryStore";

const CategoriesPage = () => {
  // UI State from Zustand Store
  const {
    searchTerm,
    isModalOpen,
    selectedCategory,
    viewCategory,
    setSearchTerm,
    openModal,
    closeModal,
    openViewModal,
    closeViewModal,
  } = useCategoryStore();

  // Local state for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Query parameters
  const queryParams = useMemo(
    () => ({
      page: currentPage,
      search: debouncedSearchTerm,
    }),
    [currentPage, debouncedSearchTerm]
  );

  // React Query hooks for data fetching
  const {
    data: categoriesResponse,
    isLoading,
    error,
    refetch,
  } = useCategories(queryParams);

  // Mutation hooks
  const deleteCategoryMutation = useDeleteCategory();
  const toggleStatusMutation = useToggleCategoryStatus();
  const restoreCategoryMutation = useRestoreCategory();

  // Extract data from response
  const categories = categoriesResponse?.data?.data || [];
  const pagination = {
    current_page: categoriesResponse?.data?.current_page || 1,
    last_page: categoriesResponse?.data?.last_page || 1,
    per_page: categoriesResponse?.data?.per_page || 8,
    total: categoriesResponse?.data?.total || 0,
    from: categoriesResponse?.data?.from || 0,
    to: categoriesResponse?.data?.to || 0,
  };

  // Event handlers
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDeleteCategory = async (item) => {
    try {
      await deleteCategoryMutation.mutateAsync(item.id);
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleRestoreCategory = async (item) => {
    try {
      await restoreCategoryMutation.mutateAsync(item.id);
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleToggleStatus = async (item) => {
    try {
      await toggleStatusMutation.mutateAsync(item.id);
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Table columns definition
  const columns = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Description",
      accessor: "description",
    },
    {
      header: "Status",
      accessor: "is_active",
      render: (item) => (
        <Badge variant={item.is_active ? "success" : "destructive"}>
          {item.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
  ];
  return (
    <div className="space-y-6">
      <TitleContent
        title="Categories Management"
        subtitle="Manage product categories"
      />

      <DataTable
        title="Categories"
        description="Manage your product categories"
        columns={columns}
        data={categories}
        isLoading={isLoading}
        pagination={pagination}
        searchValue={searchTerm}
        onSearch={handleSearch}
        onPageChange={handlePageChange}
        onAdd={() => openModal()}
        onView={(item) => openViewModal(item)}
        onEdit={(item) => openModal(item)}
        onDelete={handleDeleteCategory}
        onRestore={handleRestoreCategory}
        onToggleStatus={handleToggleStatus}
        searchPlaceholder="Cari kategori..."
        addButtonText="Tambah Kategori"
      />

      {/* Category Modal for Create/Edit */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        category={selectedCategory}
        onSuccess={() => {
          closeModal();
        }}
      />

      {/* View Category Dialog */}
      <Dialog open={!!viewCategory} onOpenChange={() => closeViewModal()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Category Details</DialogTitle>
            <DialogDescription>View category information</DialogDescription>
          </DialogHeader>
          {viewCategory && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <p>{viewCategory.name}</p>
              </div>
              <div>
                <Label>Description</Label>
                <p>{viewCategory.description || "No description"}</p>
              </div>
              <div>
                <Label>Status</Label>
                <Badge
                  variant={viewCategory.is_active ? "default" : "secondary"}
                >
                  {viewCategory.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div>
                <Label>State</Label>
                <Badge
                  variant={viewCategory.deleted_at ? "destructive" : "default"}
                >
                  {viewCategory.deleted_at ? "Deleted" : "Active"}
                </Badge>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => closeViewModal()}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriesPage;
