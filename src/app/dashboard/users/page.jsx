"use client";

import { useState, useMemo } from "react";
import TitleContent from "@/components/dashboard/TitleContent";
import { DataTable } from "@/components/ui/data-table";
import { UserModal } from "@/components/views/User/UserModal"; // ← TAMBAH INI
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
  useUsers,
  useDeleteUser,
  useToggleUserStatus,
  useRestoreUser,
} from "@/hooks/useUsers";
import useDebounce from "@/hooks/useDebounce";
import useUserStore from "@/store/userStore";

const UsersPage = () => {
  // UI State from Zustand Store
  const {
    searchTerm,
    isModalOpen,
    selectedUser,
    viewUser,
    setSearchTerm,
    openModal,
    closeModal,
    openViewModal,
    closeViewModal,
  } = useUserStore();

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
    data: usersResponse,
    isLoading,
    error,
    refetch,
  } = useUsers(queryParams);

  // Mutation hooks
  const deleteUserMutation = useDeleteUser();
  const toggleStatusMutation = useToggleUserStatus();
  const restoreUserMutation = useRestoreUser();

  // Extract data from response
  const users = usersResponse?.data?.data || [];
  const pagination = {
    current_page: usersResponse?.data?.current_page || 1,
    last_page: usersResponse?.data?.last_page || 1,
    per_page: usersResponse?.data?.per_page || 8,
    total: usersResponse?.data?.total || 0,
    from: usersResponse?.data?.from || 0,
    to: usersResponse?.data?.to || 0,
  };

  // Event handlers
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDeleteUser = async (item) => {
    try {
      await deleteUserMutation.mutateAsync(item.id);
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleRestoreUser = async (item) => {
    try {
      await restoreUserMutation.mutateAsync(item.id);
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
      header: "Email",
      accessor: "email",
    },
    {
      header: "Role",
      accessor: "role",
      render: (item) => <Badge variant="outline">{item.role || "User"}</Badge>,
    },
    {
      header: "Status",
      accessor: "is_active",
      render: (item) => (
        <Badge variant={item.is_active ? "default" : "secondary"}>
          {item.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "State",
      accessor: "deleted_at",
      render: (item) => (
        <Badge variant={item.deleted_at ? "destructive" : "default"}>
          {item.deleted_at ? "Deleted" : "Active"}
        </Badge>
      ),
    },
  ];

  // Debug log
  console.log("Users data:", users);
  console.log("Loading:", isLoading);
  console.log("Error:", error);

  return (
    <div className="space-y-6">
      <TitleContent title="Users Management" subtitle="Manage system users" />

      <DataTable
        title="Users"
        description="Manage your system users"
        columns={columns}
        data={users}
        isLoading={isLoading}
        pagination={pagination}
        searchValue={searchTerm}
        onSearch={handleSearch}
        onPageChange={handlePageChange}
        onAdd={() => openModal()}
        onView={(item) => openViewModal(item)}
        onEdit={(item) => openModal(item)}
        onDelete={handleDeleteUser}
        onRestore={handleRestoreUser}
        onToggleStatus={handleToggleStatus}
        searchPlaceholder="Cari user..."
        addButtonText="Tambah User"
      />

      {/* User Modal for Create/Edit */}
      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        user={selectedUser}
        onSuccess={() => {
          closeModal();
        }}
      />

      {/* View User Dialog */}
      <Dialog open={!!viewUser} onOpenChange={() => closeViewModal()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>View user information</DialogDescription>
          </DialogHeader>
          {viewUser && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <p>{viewUser.name}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p>{viewUser.email}</p>
              </div>
              <div>
                <Label>Role</Label>
                <Badge variant="outline">{viewUser.role || "User"}</Badge>
              </div>
              <div>
                <Label>Status</Label>
                <Badge variant={viewUser.is_active ? "default" : "secondary"}>
                  {viewUser.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div>
                <Label>State</Label>
                <Badge
                  variant={viewUser.deleted_at ? "destructive" : "default"}
                >
                  {viewUser.deleted_at ? "Deleted" : "Active"}
                </Badge>
              </div>
              <div>
                <Label>Created At</Label>
                <p>{new Date(viewUser.created_at).toLocaleDateString()}</p>
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

export default UsersPage;
