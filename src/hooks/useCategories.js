import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import categoriesService from "@/services/categories.service";
import { useToast } from "@/hooks/useToast";

export const useCategories = (params = {}) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => categoriesService.getCategories(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { crud } = useToast();

  return useMutation({
    mutationFn: categoriesService.deleteCategory,
    onSuccess: () => {
      crud.deleteSuccess("Kategori");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      crud.deleteError("Kategori");
    },
  });
};

export const useToggleCategoryStatus = () => {
  const queryClient = useQueryClient();
  const { status } = useToast();

  return useMutation({
    mutationFn: categoriesService.toggleCategoryStatus,
    onSuccess: (data) => {
      const isActive = data?.data?.is_active;
      if (isActive) {
        status.activated("Kategori");
      } else {
        status.deactivated("Kategori");
      }
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      status.statusChangeError("Kategori");
    },
  });
};

export const useRestoreCategory = () => {
  const queryClient = useQueryClient();
  const { crud } = useToast();

  return useMutation({
    mutationFn: categoriesService.restoreCategory,
    onSuccess: () => {
      crud.restoreSuccess("Kategori");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      crud.restoreError("Kategori");
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { crud } = useToast();

  return useMutation({
    mutationFn: categoriesService.createCategory,
    onSuccess: () => {
      crud.createSuccess("Kategori");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      crud.createError("Kategori");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { crud } = useToast();

  return useMutation({
    mutationFn: ({ id, data }) => categoriesService.updateCategory(id, data),
    onSuccess: () => {
      crud.updateSuccess("Kategori");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      crud.updateError("Kategori");
    },
  });
};