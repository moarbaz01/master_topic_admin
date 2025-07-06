import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookService } from "@/services/book"; // assuming your service is saved as /services/media.ts
import { GetMediaParams } from "@/types/media";

export const useBook = (params: GetMediaParams) => {
  return useQuery({
    queryKey: ["book", params],
    queryFn: () => BookService.getBook(params),
  });
};

export const useAddBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: BookService.addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book"] });
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await BookService.deleteBook(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book"] });
    },
    onError: (err: any) => {
      console.error("Delete failed:", err);
    },
  });
};

export const useGetBookById = (id: string) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => BookService.getBookById(id),
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Parameters<typeof BookService.updateBook>[1]>;
    }) => BookService.updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book"] });
    },
  });
};
