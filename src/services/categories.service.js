import instance from "@/libs/axios/instance";

const categoriesService = {
  // Get all categories dengan pagination
  getCategories: async (params = {}, options = {}) => {
    try {
      const response = await instance.get("/categories", {
        params,
        ...options,
      });
      return response;
    } catch (error) {
      // Handle canceled requests gracefully
      if (error.code === "ERR_CANCELED" || error.name === "CanceledError") {
        throw error; // Re-throw untuk di-handle di component
      }
      throw error;
    }
  },

  // Get single category
  getCategory: async (id) => {
    try {
      const response = await instance.get(`/categories/${id}`);
      return response;
    } catch (error) {
      if (error.code === "ERR_CANCELED" || error.name === "CanceledError") {
        throw error;
      }

      throw error;
    }
  },

  // Create new category
  createCategory: async (data) => {
    try {
      const response = await instance.post("/categories", data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update category
  updateCategory: async (id, data) => {
    try {
      const response = await instance.put(`/categories/${id}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete category
  deleteCategory: async (id) => {
    try {
      const response = await instance.delete(`/categories/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Restore deleted category
  restoreCategory: async (id) => {
    try {
      const response = await instance.post(`/categories/${id}/restore`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Toggle status active/inactive
  toggleStatus: async (id) => {
    try {
      const response = await instance.patch(`/categories/${id}/toggle-status`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default categoriesService;
