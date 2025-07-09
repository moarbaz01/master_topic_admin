import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BannerType } from "@/types/banner";
import { BannerService } from "@/services/banner";

// Keys for caching
const BANNER_KEYS = {
  all: ["banners"],
  one: (id: string) => ["banner", id],
};

export function useGetBanners() {
  return useQuery<BannerType[]>({
    queryKey: BANNER_KEYS.all,
    queryFn: BannerService.getAll,
  });
}

export function useGetBannerById(id: string) {
  return useQuery<BannerType | null>({
    queryKey: BANNER_KEYS.one(id),
    queryFn: () => BannerService.getById(id),
    enabled: !!id, // prevent auto-run if ID is undefined
  });
}

export function useCreateBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: BannerService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BANNER_KEYS.all });
    },
  });
}

export function useUpdateBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Omit<BannerType, "id" | "created_at">>;
    }) => BannerService.update(id, updates),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: BANNER_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: BANNER_KEYS.one(variables.id),
      });
    },
  });
}

export function useDeleteBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => BannerService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BANNER_KEYS.all });
    },
  });
}

export function useUpdateBannerPosition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, position }: { id: string; position: number }) =>
      BannerService.updatePosition(id, position),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BANNER_KEYS.all });
    },
  });
}
