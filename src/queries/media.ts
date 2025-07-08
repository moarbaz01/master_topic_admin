// /queries/media.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MediaService } from "@/services/media"; // assuming your service is saved as /services/media.ts
import { CloudinaryService } from "@/services/cloudinary";
import { GetMediaParams } from "@/types/media";

export const useMedia = (params: GetMediaParams) => {
  return useQuery({
    queryKey: ["media", params],
    queryFn: () => MediaService.getMedia(params),
  });
};

export const useAddMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MediaService.addMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
  });
};

export const useDeleteMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      publicId,
      format,
    }: {
      id: string;
      publicId: string;
      format: string;
    }) => {
      // 1. Delete from Cloudinary
      await CloudinaryService.deleteMedia(publicId, format);

      // 2. Delete from your Supabase/DB
      await MediaService.deleteMedia(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
    onError: (err: any) => {
      console.error("Delete failed:", err);
    },
  });
};

export const useGetMediaById = (id: string) => {
  return useQuery({
    queryKey: ["media", id],
    queryFn: () => MediaService.getMediaById(id),
  });
};

export const useUpdateMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Parameters<typeof MediaService.updateMedia>[1]>;
    }) => MediaService.updateMedia(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
  });
};
