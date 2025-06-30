import instance from "@/libs/axios/instance";

const usersService = {
  getUsers: async (params = {}, options = {}) => {
    try {
      const response = await instance.get("/users", {
        params,
        ...options,
      });
      return response;
    } catch (error) {
      if (error.code === "ERR_CANCELED" || error.name === "CanceledError") {
        throw error;
      }
      throw error;
    }
  },

  getUser: async (id) => {
    try {
      const response = await instance.get(`/users/${id}`);
      return response;
    } catch (error) {
      if (error.code === "ERR_CANCELED" || error.name === "CanceledError") {
        throw error;
      }

      throw error;
    }
  },

  updateUser: async (id, data) => {
    try {
      const response = await instance.put(`/users/${id}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await instance.delete(`/users/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  toggleStatus: async (id) => {
    try {
      const response = await instance.patch(`/users/${id}/toggle-status`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateRole: async (id, data) => {
    try {
      const response = await instance.put(`/users/${id}/role`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default usersService;
