// /queries/tags.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TagsService } from "@/services/tags";
import { GetTagsParams } from "@/types/tag";

// GET
export const useTags = (params: GetTagsParams) =>
  useQuery({
    queryKey: ["tags", params],
    queryFn: () => TagsService.getTags(params),
  });

export const useTagsAll = () =>
  useQuery({
    queryKey: ["tags"],
    queryFn: () => TagsService.getTagsAll(),
  });

// ADD
export const useAddTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TagsService.addTags,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tags"] }),
  });
};

// DELETE
export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TagsService.deleteTags,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tags"] }),
  });
};

// UPDATE
export const useUpdateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      TagsService.updateTags(id, name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tags"] }),
  });
};
