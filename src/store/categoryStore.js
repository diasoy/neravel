import { create } from "zustand";

const useCategoryStore = create((set) => ({
  // UI State Management
  searchTerm: "",
  isModalOpen: false,
  selectedCategory: null,
  isSubmitting: false,
  viewCategory: null,

  // Setters
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setViewCategory: (viewCategory) => set({ viewCategory }),

  // Modal actions
  openModal: (category = null) =>
    set({
      isModalOpen: true,
      selectedCategory: category,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      selectedCategory: null,
    }),

  openViewModal: (category) => set({ viewCategory: category }),

  closeViewModal: () => set({ viewCategory: null }),

  // Reset UI state
  resetState: () =>
    set({
      searchTerm: "",
      isModalOpen: false,
      selectedCategory: null,
      isSubmitting: false,
      viewCategory: null,
    }),
}));

export default useCategoryStore;
