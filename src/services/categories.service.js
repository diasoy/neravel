import instance from "@/libs/axios/instance";

const categoriesService = {
  // Get paginated categories with search
  getCategories: async (params = {}) => {
    const response = await instance.get("/categories", { params });
    return response.data;
  },

  // Get single category by ID
  getCategoryById: async (id) => {
    const response = await instance.get(`/categories/${id}`);
    return response.data;
  },

  // Create new category
  createCategory: async (data) => {
    const response = await instance.post("/categories", data);
    return response.data;
  },

  // Update category
  updateCategory: async (id, data) => {
    const response = await instance.put(`/categories/${id}`, data);
    return response.data;
  },

  // Delete category
  deleteCategory: async (id) => {
    const response = await instance.delete(`/categories/${id}`);
    return response.data;
  },

  // Restore deleted category
  restoreCategory: async (id) => {
    const response = await instance.post(`/categories/${id}/restore`);
    return response.data;
  },

  // Toggle category status (active/inactive)
  toggleCategoryStatus: async (id) => {
    const response = await instance.patch(`/categories/${id}/toggle-status`);
    return response.data;
  },
};

export default categoriesService;
