import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import usersService from "@/services/users.service";
import { useToast } from "@/hooks/useToast";

// Hook untuk fetch users dengan pagination dan search
export const useUsers = (params = {}) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => usersService.getUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook untuk fetch single user
export const useUser = (id, enabled = true) => {
  return useQuery({
    queryKey: ["users", "detail", id],
    queryFn: () => usersService.getUserById(id),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook untuk create user
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { crud } = useToast();

  return useMutation({
    mutationFn: usersService.createUser,
    onSuccess: () => {
      crud.createSuccess("User");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      crud.createError("User");
    },
  });
};

// Hook untuk update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { crud } = useToast();

  return useMutation({
    mutationFn: ({ id, data }) => usersService.updateUser(id, data),
    onSuccess: () => {
      crud.updateSuccess("User");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      crud.updateError("User");
    },
  });
};

// Hook untuk delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { crud } = useToast();

  return useMutation({
    mutationFn: usersService.deleteUser,
    onSuccess: () => {
      crud.deleteSuccess("User");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      crud.deleteError("User");
    },
  });
};

// Hook untuk toggle user status
export const useToggleUserStatus = () => {
  const queryClient = useQueryClient();
  const { status } = useToast();

  return useMutation({
    mutationFn: usersService.toggleUserStatus,
    onSuccess: (data) => {
      const isActive = data?.data?.is_active;
      if (isActive) {
        status.activated("User");
      } else {
        status.deactivated("User");
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      status.statusChangeError("User");
    },
  });
};

// Hook untuk restore user
export const useRestoreUser = () => {
  const queryClient = useQueryClient();
  const { crud } = useToast();

  return useMutation({
    mutationFn: usersService.restoreUser,
    onSuccess: () => {
      crud.restoreSuccess("User");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      crud.restoreError("User");
    },
  });
};
