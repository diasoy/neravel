"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import TitleContent from "@/components/dashboard/TitleContent";
import { DataTable } from "@/components/ui/data-table";
import { UserModal } from "@/components/views/User/UserModal";
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
import usersService from "@/services/users.service";
import { useToast } from "@/hooks/useToast";
import useUserStore from "@/store/userStore";

const UsersPage = () => {
  const { crud, loading, status } = useToast();

  const {
    users,
    pagination,
    isLoading,
    searchTerm,
    isModalOpen,
    selectedUser,
    isSubmitting,
    viewUser,
    setUsers,
    setPagination,
    setIsLoading,
    setSearchTerm,
    setIsSubmitting,
    openModal,
    closeModal,
    openViewModal,
    closeViewModal,
    fetchUsers,
    deleteUser,
    toggleUserStatus,
  } = useUserStore();

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch users on component mount and search term change
  useEffect(() => {
    fetchUsers(1, debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchUsers]);

  // Handler functions
  const handlePageChange = useCallback(
    (page) => {
      fetchUsers(page, searchTerm);
    },
    [fetchUsers, searchTerm]
  );

  const handleSearch = useCallback(
    (term) => {
      setSearchTerm(term);
    },
    [setSearchTerm]
  );

  const handleAddUser = useCallback(() => {
    openModal();
  }, [openModal]);

  const handleEditUser = useCallback(
    (user) => {
      openModal(user);
    },
    [openModal]
  );

  const handleViewUser = useCallback(
    (user) => {
      openViewModal(user);
    },
    [openViewModal]
  );

  const handleDeleteUser = useCallback(
    async (user) => {
      if (
        window.confirm(`Apakah Anda yakin ingin menghapus user ${user.name}?`)
      ) {
        const success = await deleteUser(user.id);
        if (success) {
          crud.success("User berhasil dihapus");
        } else {
          crud.error("Gagal menghapus user");
        }
      }
    },
    [deleteUser, crud]
  );

  const handleToggleStatus = useCallback(
    async (user) => {
      const action = user.is_active ? "menonaktifkan" : "mengaktifkan";
      if (
        window.confirm(`Apakah Anda yakin ingin ${action} user ${user.name}?`)
      ) {
        const success = await toggleUserStatus(user.id);
        if (success) {
          crud.success(
            `User berhasil ${user.is_active ? "dinonaktifkan" : "diaktifkan"}`
          );
        } else {
          crud.error(`Gagal ${action} user`);
        }
      }
    },
    [toggleUserStatus, crud]
  );

  const handleFormSubmit = useCallback(
    async (formData) => {
      setIsSubmitting(true);
      try {
        if (selectedUser) {
          // Update user
          await usersService.update(selectedUser.id, formData);
          crud.success("User berhasil diperbarui");
        } else {
          // Create user
          await usersService.create(formData);
          crud.success("User berhasil ditambahkan");
        }

        closeModal();
        fetchUsers(pagination.current_page || 1, searchTerm);
      } catch (error) {
        crud.error(
          selectedUser ? "Gagal memperbarui user" : "Gagal menambahkan user"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      selectedUser,
      setIsSubmitting,
      crud,
      closeModal,
      fetchUsers,
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
      header: "Nama User",
      accessor: "name",
      render: (item) => (
        <div>
          <div className="font-medium">{item.name}</div>
          <div className="text-sm text-gray-500">{item.email}</div>
        </div>
      ),
    },
    {
      header: "Role",
      accessor: "role",
      render: (item) => (
        <Badge variant={item.role === "admin" ? "default" : "secondary"}>
          {item.role}
        </Badge>
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
      <TitleContent title="Users" description="Kelola pengguna sistem Anda" />

      <DataTable
        title="Daftar User"
        description={`Total ${pagination.total || 0} user`}
        data={users}
        columns={columns}
        pagination={pagination}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onAdd={handleAddUser}
        onView={handleViewUser}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onToggleStatus={handleToggleStatus}
        searchPlaceholder="Cari nama atau email user..."
        searchValue={searchTerm}
        showAddButton={false}
      />

      {/* Add/Edit Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        user={selectedUser}
        isLoading={isSubmitting}
      />

      {/* Detail View Modal */}
      {viewUser && (
        <Dialog open={!!viewUser} onOpenChange={closeViewModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Detail User</DialogTitle>
              <DialogDescription>
                Informasi lengkap user {viewUser.name}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold">Nama User</Label>
                <p className="text-sm text-gray-600">{viewUser.name}</p>
              </div>

              <div>
                <Label className="text-sm font-semibold">Email</Label>
                <p className="text-sm text-gray-600">{viewUser.email}</p>
              </div>

              <div>
                <Label className="text-sm font-semibold">Role</Label>
                <div className="mt-1">
                  <Badge
                    variant={
                      viewUser.role === "admin" ? "default" : "secondary"
                    }
                  >
                    {viewUser.role}
                  </Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold">Status</Label>
                <div className="mt-1">
                  <Badge
                    variant={viewUser.is_active ? "success" : "destructive"}
                  >
                    {viewUser.is_active ? "Aktif" : "Tidak Aktif"}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold">Dibuat</Label>
                  <p className="text-sm text-gray-600">
                    {new Date(viewUser.created_at).toLocaleDateString("id-ID")}{" "}
                    {new Date(viewUser.created_at)
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
                    {new Date(viewUser.updated_at).toLocaleDateString("id-ID")}{" "}
                    {new Date(viewUser.updated_at)
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

export default UsersPage;
