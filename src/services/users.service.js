import instance from "@/libs/axios/instance";

const usersService = {
  getUsers: async (params = {}, options = {}) => {
    try {
      const response = await instance.get("/users", {
        params,
        ...options,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch users"
      );
    }
  },

  create: async (data) => {
    try {
      const response = await instance.post("/users", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  get: async (id) => {
    try {
      const response = await instance.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      if (error.code === "ERR_CANCELED" || error.name === "CanceledError") {
        throw error;
      }
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await instance.put(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await instance.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  toggleStatus: async (id) => {
    try {
      const response = await instance.patch(`/users/${id}/toggle-status`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateRole: async (id, data) => {
    try {
      const response = await instance.put(`/users/${id}/role`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (data) => usersService.create(data),
  getUser: async (id) => usersService.get(id),
  updateUser: async (id, data) => usersService.update(id, data),
  deleteUser: async (id) => usersService.delete(id),
};

export default usersService;
