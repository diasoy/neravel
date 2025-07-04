import instance from "@/libs/axios/instance";

const categoriesService = {
  getCategories: async (params = {}, options = {}) => {
    try {
      const response = await instance.get("/categories", {
        params,
        ...options,
      });
      return response;
    } catch (error) {
      if (error.code === "ERR_CANCELED" || error.name === "CanceledError") {
        throw error; 
      }
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch categories"
      );
    }
  },

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

  create: async (data) => {
    try {
      const response = await instance.post("/categories", data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await instance.put(`/categories/${id}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await instance.delete(`/categories/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  restore: async (id) => {
    try {
      const response = await instance.post(`/categories/${id}/restore`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  toggleStatus: async (id) => {
    try {
      const response = await instance.patch(`/categories/${id}/toggle-status`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  createCategory: async (data) => categoriesService.create(data),
  updateCategory: async (id, data) => categoriesService.update(id, data),
  deleteCategory: async (id) => categoriesService.delete(id),
  restoreCategory: async (id) => categoriesService.restore(id),
};

export default categoriesService;