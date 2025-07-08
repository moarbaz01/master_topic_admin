// queries/course-queries.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CourseService } from "@/services/course";
import { CreateCourseType, GetCourseParams } from "@/types/course";

// ✅ Fetch all courses with pagination and optional search
export const useCourses = (params: GetCourseParams = {}) =>
  useQuery({
    queryKey: ["courses", params],
    queryFn: () => CourseService.getCourse(params),
  });

// ✅ Fetch a single course by ID
export const useCourseById = (id: string) =>
  useQuery({
    queryKey: ["course", id],
    queryFn: () => CourseService.getCourseById(id),
    enabled: !!id,
  });

// ✅ Add a new course
export const useAddCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCourseType) => CourseService.addCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

// ✅ Update a course
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateCourseType>;
    }) => CourseService.updateCourse(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["course", id] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

// ✅ Delete a course
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => CourseService.deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
