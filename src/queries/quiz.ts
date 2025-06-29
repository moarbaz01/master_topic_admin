import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QuizService } from "@/services/quiz";

// ─── Quizzes ──────────────────────────────────────────────

export const useGetQuizzes = () =>
  useQuery({ queryKey: ["quizzes"], queryFn: QuizService.getQuizzes });

export const useGetQuizById = (id: string) =>
  useQuery({
    queryKey: ["quiz", id],
    queryFn: () => QuizService.getQuizById(id),
    enabled: !!id,
  });

export const useAddQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: QuizService.addQuiz,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizzes"] }),
  });
};

export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      QuizService.updateQuiz(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizzes"] }),
  });
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: QuizService.deleteQuiz,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizzes"] }),
  });
};

// ─── Sections ──────────────────────────────────────────────

export const useGetSectionsByQuizId = (quizId: string) =>
  useQuery({
    queryKey: ["sections", quizId],
    queryFn: () => QuizService.getSectionsByQuizId(quizId),
    enabled: !!quizId,
  });

export const useAddSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: QuizService.addSection,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sections"] }),
  });
};

export const useUpdateSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      QuizService.updateSection(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sections"] }),
  });
};

export const useDeleteSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: QuizService.deleteSection,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sections"] }),
  });
};

// ─── Questions ──────────────────────────────────────────────

export const useGetQuestionsBySection = (sectionId: string) =>
  useQuery({
    queryKey: ["questions", sectionId],
    queryFn: () => QuizService.getQuestionsBySection(sectionId),
    enabled: !!sectionId,
  });

export const useAddQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: QuizService.addQuestion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizzes"] }),
  });
};

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      QuizService.updateQuestion(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizzes"] }),
  });
};

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: QuizService.deleteQuestion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizzes"] }),
  });
};

// ─── Options ──────────────────────────────────────────────

export const useGetOptionsByQuestion = (questionId: string) =>
  useQuery({
    queryKey: ["options", questionId],
    queryFn: () => QuizService.getOptionsByQuestion(questionId),
    enabled: !!questionId,
  });

export const useAddOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: QuizService.addOption,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizzes"] }),
  });
};

export const useUpdateOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      QuizService.updateOption(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizzes"] }),
  });
};

export const useDeleteOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: QuizService.deleteOption,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizzes"] }),
  });
};
