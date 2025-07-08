import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LectureService } from "@/services/lecture";
import { CreateLectureType } from "@/types/course";

// --- Add Lecture
export function useAddLecture() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lecture: CreateLectureType) =>
      LectureService.addLecture(lecture),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
    },
  });
}

// --- Get Lecture by ID
export function useLectureById(id: string) {
  return useQuery({
    queryKey: ["lecture", id],
    queryFn: () => LectureService.getLectureById(id),
    enabled: !!id,
  });
}

// --- Get Lectures by Course ID
export function useLecturesByCourseId(courseId: string) {
  return useQuery({
    queryKey: ["lectures", courseId],
    queryFn: () => LectureService.getLecturesByCourseId(courseId),
    enabled: !!courseId,
  });
}

// --- Update Lecture
export function useUpdateLecture() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateLectureType>;
    }) => LectureService.updateLecture(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["lecture", id] });
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
    },
  });
}

// --- Delete Lecture
export function useDeleteLecture() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => LectureService.deleteLecture(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
    },
  });
}
