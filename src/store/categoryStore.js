import { create } from "zustand";
import categoriesService from "@/services/categories.service";

const useCategoryStore = create((set, get) => ({
  // State
  categories: [],
  pagination: {},
  isLoading: true,
  searchTerm: "",
  isModalOpen: false,
  selectedCategory: null,
  isSubmitting: false,
  viewCategory: null,

  // Actions
  setCategories: (categories) => set({ categories }),
  setPagination: (pagination) => set({ pagination }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setViewCategory: (viewCategory) => set({ viewCategory }),

  // Complex actions
  openModal: (category = null) => set({ 
    isModalOpen: true, 
    selectedCategory: category 
  }),
  
  closeModal: () => set({ 
    isModalOpen: false, 
    selectedCategory: null 
  }),

  openViewModal: (category) => set({ viewCategory: category }),
  
  closeViewModal: () => set({ viewCategory: null }),

  // Reset all state
  resetState: () => set({
    categories: [],
    pagination: {},
    isLoading: true,
    searchTerm: "",
    isModalOpen: false,
    selectedCategory: null,
    isSubmitting: false,
    viewCategory: null,
  }),

  // Async actions
  fetchCategories: async (page = 1, search = "") => {
    set({ isLoading: true });
    try {
      const response = await categoriesService.getCategories({ page, search });
      
      // Response structure: response.data.data.data (categories array)
      const categoriesData = response.data?.data?.data || [];
      
      // Extract pagination dari response.data.data (Laravel pagination format)
      const paginationData = {
        current_page: response.data?.data?.current_page || 1,
        last_page: response.data?.data?.last_page || 1,
        per_page: response.data?.data?.per_page || 8,
        total: response.data?.data?.total || 0,
        from: response.data?.data?.from || 0,
        to: response.data?.data?.to || 0,
        next_page_url: response.data?.data?.next_page_url,
        prev_page_url: response.data?.data?.prev_page_url,
      };
      
      set({
        categories: categoriesData,
        pagination: paginationData,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      set({ 
        categories: [], 
        pagination: {},
        isLoading: false 
      });
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      await categoriesService.deleteCategory(categoryId);
      const { categories } = get();
      set({ categories: categories.filter((category) => category.id !== categoryId) });
      return true;
    } catch (error) {
      console.error("Error deleting category:", error);
      return false;
    }
  },

  restoreCategory: async (categoryId) => {
    try {
      await categoriesService.restoreCategory(categoryId);
      // Refresh data after restore
      const { fetchCategories, pagination, searchTerm } = get();
      fetchCategories(pagination.current_page || 1, searchTerm);
      return true;
    } catch (error) {
      console.error("Error restoring category:", error);
      return false;
    }
  },

  toggleCategoryStatus: async (categoryId) => {
    try {
      await categoriesService.toggleStatus(categoryId);
      const { categories } = get();
      set({
        categories: categories.map((category) =>
          category.id === categoryId 
            ? { ...category, is_active: !category.is_active } 
            : category
        ),
      });
      return true;
    } catch (error) {
      console.error("Error toggling category status:", error);
      return false;
    }
  },

  // Get single category for view modal
  fetchCategoryDetail: async (categoryId) => {
    try {
      const response = await categoriesService.getCategory(categoryId);
      if (response.data?.success) {
        set({ viewCategory: response.data.data });
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching category detail:", error);
      return null;
    }
  },
}));

export default useCategoryStore;