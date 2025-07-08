import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { VocabularyService } from "@/services/vocabulary";

// -------------------------
// Vocabulary Queries
// -------------------------
export const useVocabularies = () => {
  return useQuery({
    queryKey: ["vocabularies"],
    queryFn: () => VocabularyService.getAllVocabularies(),
  });
};

export const useVocabularyById = (id: string) => {
  return useQuery({
    queryKey: ["vocabularies", id],
    queryFn: () => VocabularyService.getVocabularyById(id),
    enabled: !!id,
  });
};

export const useCreateVocabulary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title: string) => VocabularyService.createVocabulary(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vocabularies"] });
    },
  });
};

export const useUpdateVocabulary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: string; title: string }) =>
      VocabularyService.updateVocabulary(payload.id, payload.title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vocabularies"] });
    },
  });
};

export const useDeleteVocabulary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => VocabularyService.deleteVocabulary(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vocabularies"] });
    },
  });
};

// -------------------------
// Section Queries
// -------------------------
export const useVocabularySections = (vocabularyId: string) => {
  return useQuery({
    queryKey: ["sections", vocabularyId],
    queryFn: () => VocabularyService.getSections(vocabularyId),
    enabled: !!vocabularyId,
  });
};

export const useCreateVocabularySection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { title: string; vocabulary_id: string }) =>
      VocabularyService.createSection(payload.title, payload.vocabulary_id),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["sections", vars.vocabulary_id],
      });
    },
  });
};

export const useUpdateVocabularySection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      id: string;
      title: string;
      vocabulary_id: string;
    }) => VocabularyService.updateSection(payload.id, payload.title),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["sections", vars.vocabulary_id],
      });
    },
  });
};

export const useDeleteVocabularySection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: string; vocabulary_id: string }) =>
      VocabularyService.deleteSection(payload.id),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["sections", vars.vocabulary_id],
      });
    },
  });
};

// -------------------------
// Word Queries
// -------------------------
export const useVocabularyWords = (sectionId: string) => {
  return useQuery({
    queryKey: ["words", sectionId],
    queryFn: () => VocabularyService.getWords(sectionId),
    enabled: !!sectionId,
  });
};

export const useCreateVocabularyWord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      section_id: string;
      word: string;
      definition: string;
      image?: string | null;
      audio?: string | null;
    }) =>
      VocabularyService.createWord(
        payload.section_id,
        payload.word,
        payload.definition,
        payload.image,
        payload.audio
      ),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["words", variables.section_id],
      });
    },
  });
};

export const useUpdateVocabularyWord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      id: string;
      section_id: string;
      word?: string;
      definition?: string;
      image?: string | null;
      audio?: string | null;
    }) =>
      VocabularyService.updateWord(payload.id, {
        word: payload.word,
        definition: payload.definition,
        image: payload.image,
        audio: payload.audio,
      }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["words", variables.section_id],
      });
    },
  });
};

export const useDeleteVocabularyWord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: string; section_id: string }) =>
      VocabularyService.deleteWord(payload.id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["words", variables.section_id],
      });
    },
  });
};
