import instance from "@/libs/axios/instance";

const categoriesService = {
  getCategories: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return instance.get(`/categories${queryParams ? `?${queryParams}` : ""}`);
  },
  getCategory: (id) => instance.get(`/categories/${id}`),
  createCategory: (data) => instance.post("/categories", data),
  updateCategory: (id, data) => instance.put(`/categories/${id}`, data),
  deleteCategory: (id) => instance.delete(`/categories/${id}`),
  toggleStatus: (id) => instance.patch(`/categories/${id}/toggle-status`),
};

export default categoriesService;
