import { create } from "zustand";
import usersService from "@/services/users.service";

const useUserStore = create((set, get) => ({
  // State
  users: [],
  pagination: {},
  isLoading: true,
  searchTerm: "",
  isModalOpen: false,
  selectedUser: null,
  isSubmitting: false,
  viewUser: null,

  // Actions
  setUsers: (users) => set({ users }),
  setPagination: (pagination) => set({ pagination }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setViewUser: (viewUser) => set({ viewUser }),

  // Complex actions
  openModal: (user = null) => set({ 
    isModalOpen: true, 
    selectedUser: user 
  }),
  
  closeModal: () => set({ 
    isModalOpen: false, 
    selectedUser: null 
  }),

  openViewModal: (user) => set({ viewUser: user }),
  
  closeViewModal: () => set({ viewUser: null }),

  // Reset all state
  resetState: () => set({
    users: [],
    pagination: {},
    isLoading: true,
    searchTerm: "",
    isModalOpen: false,
    selectedUser: null,
    isSubmitting: false,
    viewUser: null,
  }),

  // Async actions - Perbaiki struktur response
  fetchUsers: async (page = 1, search = "") => {
    set({ isLoading: true });
    try {
      const response = await usersService.getUsers({ page, search });
      
      // Response structure: response.data.data (users array)
      const usersData = response.data?.data || [];
      
      // Extract pagination dari response.data (Laravel pagination format)
      const paginationData = {
        current_page: response.data?.current_page || 1,
        last_page: response.data?.last_page || 1,
        per_page: response.data?.per_page || 10,
        total: response.data?.total || 0,
        from: response.data?.from || 0,
        to: response.data?.to || 0,
        next_page_url: response.data?.next_page_url,
        prev_page_url: response.data?.prev_page_url,
      };
      
      set({
        users: usersData,
        pagination: paginationData,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      set({ 
        users: [], 
        pagination: {},
        isLoading: false 
      });
    }
  },

  deleteUser: async (userId) => {
    try {
      await usersService.deleteUser(userId);
      const { users } = get();
      set({ users: users.filter((user) => user.id !== userId) });
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  },

  toggleUserStatus: async (userId) => {
    try {
      await usersService.toggleStatus(userId);
      const { users } = get();
      set({
        users: users.map((user) =>
          user.id === userId ? { ...user, is_active: !user.is_active } : user
        ),
      });
      return true;
    } catch (error) {
      console.error("Error toggling user status:", error);
      return false;
    }
  },
}));

export default useUserStore;