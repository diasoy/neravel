import { create } from "zustand";

const useUserStore = create((set) => ({
  // Search and filter states
  searchTerm: "",
  selectedRole: "",
  selectedStatus: "",
  
  // Modal states
  isModalOpen: false,
  selectedUser: null,
  viewUser: null,
  
  // Actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedRole: (role) => set({ selectedRole: role }),
  setSelectedStatus: (status) => set({ selectedStatus: status }),
  
  // Modal actions
  openModal: (user = null) => 
    set({ isModalOpen: true, selectedUser: user }),
  closeModal: () => 
    set({ isModalOpen: false, selectedUser: null }),
  
  openViewModal: (user) => 
    set({ viewUser: user }),
  closeViewModal: () => 
    set({ viewUser: null }),
  
  // Reset all filters
  resetFilters: () => 
    set({ 
      searchTerm: "", 
      selectedRole: "", 
      selectedStatus: "" 
    }),
}));

export default useUserStore;