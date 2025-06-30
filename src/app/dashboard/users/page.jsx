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

const UsersPage = () => {
  const { crud, loading, status } = useToast();
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detail view state
  const [viewUser, setViewUser] = useState(null);

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

  // Use refs to store current values to avoid dependency issues
  const paginationRef = useRef(pagination);
  const debouncedSearchTermRef = useRef(debouncedSearchTerm);

  // Update refs when values change
  useEffect(() => {
    paginationRef.current = pagination;
  }, [pagination]);

  useEffect(() => {
    debouncedSearchTermRef.current = debouncedSearchTerm;
  }, [debouncedSearchTerm]);

  const loadUsers = useCallback(
    async (page = 1, search = "") => {
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

        const response = await usersService.getUsers(params, {
          signal: abortControllerRef.current.signal,
        });

        if (response.data.success) {
          setUsers(response.data.data.data);
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

        loading.fetchError("User");
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [] // Empty dependencies array to prevent infinite loop
  );

  const handlePageChange = useCallback(
    (page) => {
      loadUsers(page, debouncedSearchTermRef.current);
    },
    [] // Remove all dependencies
  );

  const handleSearch = useCallback((search) => {
    setSearchTerm(search);
  }, []);

  const handleAddUser = useCallback(() => {
    setSelectedUser(null);
    setIsModalOpen(true);
  }, []);

  const handleViewUser = useCallback(
    async (user) => {
      try {
        const response = await usersService.getUser(user.id);
        if (response.data.success) {
          setViewUser(response.data.data);
        }
      } catch (error) {
        loading.fetchError("Detail User");
      }
    },
    [] // Empty dependencies array to prevent infinite loop
  );

  const handleEditUser = useCallback((user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  const handleDeleteUser = useCallback(
    async (user) => {
      if (confirm(`Apakah Anda yakin ingin menghapus user "${user.name}"?`)) {
        try {
          await usersService.deleteUser(user.id);
          crud.deleteSuccess("User");
          loadUsers(
            paginationRef.current.current_page,
            debouncedSearchTermRef.current
          );
        } catch (error) {
          crud.deleteError("User");
        }
      }
    },
    [] // Remove all dependencies
  );

  const handleToggleStatus = useCallback(
    async (user) => {
      try {
        await usersService.toggleStatus(user.id);
        if (user.is_active) {
          status.deactivated("User");
        } else {
          status.activated("User");
        }
        loadUsers(
          paginationRef.current.current_page,
          debouncedSearchTermRef.current
        );
      } catch (error) {
        status.statusChangeError("User");
      }
    },
    [] // Remove all dependencies
  );

  const handleUpdateRole = useCallback(
    async (user, newRole) => {
      try {
        await usersService.updateRole(user.id, { role: newRole });
        crud.updateSuccess("Role User");
        loadUsers(
          paginationRef.current.current_page,
          debouncedSearchTermRef.current
        );
      } catch (error) {
        crud.updateError("Role User");
      }
    },
    [] // Remove all dependencies
  );

  const handleFormSubmit = useCallback(
    async (formData) => {
      try {
        setIsSubmitting(true);

        if (selectedUser) {
          await usersService.updateUser(selectedUser.id, formData);
          crud.updateSuccess("User");
        } else {
          await usersService.createUser(formData);
          crud.createSuccess("User");
        }

        setIsModalOpen(false);
        loadUsers(
          paginationRef.current.current_page,
          debouncedSearchTermRef.current
        );
      } catch (error) {
        if (selectedUser) {
          crud.updateError("User");
        } else {
          crud.createError("User");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedUser] // Only depend on selectedUser
  );

  useEffect(() => {
    if (isInitialMount.current) {
      loadUsers();
      isInitialMount.current = false;
    }
  }, []); // Remove loadUsers from dependencies to prevent infinite loop

  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }

    if (debouncedSearchTerm !== undefined) {
      loadUsers(1, debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]); // Remove loadUsers from dependencies to prevent infinite loop

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

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
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        user={selectedUser}
        isLoading={isSubmitting}
      />

      {/* Detail View Modal */}
      {viewUser && (
        <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
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
              <Button variant="outline" onClick={() => setViewUser(null)}>
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
