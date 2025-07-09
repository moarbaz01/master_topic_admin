// Base interfaces for existing DB records
export interface QuizType {
  id: string;
  title: string;
  total_questions: number;
  total_time: number;
}

export interface QuizSectionType {
  id: string;
  quiz_id: string;
  title: string;
  total_questions: number;
}

export interface QuizQuestionType {
  id: string;
  quiz_id: string;
  section_id: string;
  type: "image" | "text" | "audio";
  question: string;
  description?: string;
  image?: string;
  audio?: string;
  images?: string[];
  options?: string[];
  correct_answer?: string;
}

export interface QuizOptionType {
  id: string;
  question_id: string;
  text?: string;
  image?: string;
  audio?: string;
}

export type CreateQuiz = Omit<QuizType, "id">;
export type CreateQuizSection = Omit<QuizSectionType, "id">;
export type CreateQuizQuestion = Omit<QuizQuestionType, "id">;
export type CreateQuizOption = Omit<QuizOptionType, "id">;
