// hooks/useUsers.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/services/user";
import type { GetUsersParams, UpdateUserType } from "@/types/user";
import { AuthService } from "@/services/auth";

// 🔹 Fetch all users
export const useGetUsers = (params: GetUsersParams = {}) =>
  useQuery({
    queryKey: ["users", params], // <== include params in key for caching
    queryFn: () => UserService.getUsers(params),
  });

// 🔹 Fetch single user
export const useGetUserById = (id: string) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: () => UserService.getUserById(id),
    enabled: !!id, // only run if id exists
  });

// 🔹 Update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserType }) =>
      UserService.updateUser(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useGetSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: () => AuthService.getSession(),
  });
};

// 🔹 Delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => UserService.deleteUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
