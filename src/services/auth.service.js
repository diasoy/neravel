import instance from "@/libs/axios/instance";

const authService = {
  // User registration
  register: async (data) => {
    const response = await instance.post("/auth/register", data);
    return response.data;
  },

  // User login
  login: async (credentials) => {
    const response = await instance.post("/auth/login", credentials);
    return response.data;
  },

  // User logout
  logout: async () => {
    const response = await instance.post("/auth/logout");
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await instance.get("/auth/user");
    return response.data;
  },

  // Refresh token
  refreshToken: async () => {
    const response = await instance.post("/auth/refresh");
    return response.data;
  },

  // Reset password
  resetPassword: async (data) => {
    const response = await instance.post("/auth/reset-password", data);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await instance.post("/auth/forgot-password", { email });
    return response.data;
  },
};

export default authService;
