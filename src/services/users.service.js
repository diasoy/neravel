import instance from "@/libs/axios/instance";

const usersService = {
  // Get all users with pagination and search
  getUsers: async (params = {}) => {
    const response = await instance.get("/users", { params });
    return response.data;
  },

  // Get single user by ID
  getUserById: async (id) => {
    const response = await instance.get(`/users/${id}`);
    return response.data;
  },

  // Create new user
  createUser: async (data) => {
    const response = await instance.post("/users", data);
    return response.data;
  },

  // Update user
  updateUser: async (id, data) => {
    const response = await instance.put(`/users/${id}`, data);
    return response.data;
  },

  // Delete user (soft delete)
  deleteUser: async (id) => {
    const response = await instance.delete(`/users/${id}`);
    return response.data;
  },

  // Restore deleted user
  restoreUser: async (id) => {
    const response = await instance.post(`/users/${id}/restore`);
    return response.data;
  },

  // Toggle user status (active/inactive)
  toggleUserStatus: async (id) => {
    const response = await instance.patch(`/users/${id}/toggle-status`);
    return response.data;
  },

  // Update user role
  updateUserRole: async (id, data) => {
    const response = await instance.patch(`/users/${id}/role`, data);
    return response.data;
  },
};

export default usersService;