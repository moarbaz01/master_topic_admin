import { supabase } from "@/lib/supabase/client";

export const QuizService = {
  // ─────────────── Quizzes ───────────────

  async addQuiz(quiz: {
    title: string;
    total_questions?: number;
    total_time?: number;
  }) {
    const { data, error } = await supabase
      .from("quizzes")
      .insert(quiz)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async getQuizzes() {
    const { data, error } = await supabase.from("quizzes").select("*");
    if (error) throw new Error(error.message);
    return data;
  },

  async getQuizById(id: string) {
    const { data, error } = await supabase
      .from("quizzes")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async updateQuiz(
    id: string,
    updates: Partial<{
      title: string;
      total_questions: number;
      total_time: number;
    }>
  ) {
    const { data, error } = await supabase
      .from("quizzes")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async deleteQuiz(id: string) {
    const { data, error } = await supabase
      .from("quizzes")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);
    return data;
  },

  // ─────────────── Sections ───────────────

  async getSection() {
    const { data, error } = await supabase.from("quiz_sections").select("*");
    if (error) throw new Error(error.message);
    return data;
  },

  async addSection(section: {
    quiz_id: string;
    title: string;
    total_questions?: number;
  }) {
    const { data, error } = await supabase
      .from("quiz_sections")
      .insert(section)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async getSectionsByQuizId(quiz_id: string) {
    const { data, error } = await supabase
      .from("quiz_sections")
      .select("*")
      .eq("quiz_id", quiz_id);
    if (error) throw new Error(error.message);
    return data;
  },

  async updateSection(
    id: string,
    updates: Partial<{ title: string; total_questions: number }>
  ) {
    const { data, error } = await supabase
      .from("quiz_sections")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async deleteSection(id: string) {
    const { data, error } = await supabase
      .from("quiz_sections")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);
    return data;
  },

  // ─────────────── Questions ───────────────

  async getQuestions() {
    const { data, error } = await supabase.from("quiz_questions").select("*");
    if (error) throw new Error(error.message);
    return data;
  },

  async addQuestion(question: {
    quiz_id: string;
    section_id: string;
    type: string;
    question: string;
    description?: string;
    image?: string;
    audio?: string;
    images?: string[];
    correct_answer: string;
  }) {
    const { data, error } = await supabase
      .from("quiz_questions")
      .insert(question)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async getQuestionsBySection(section_id: string) {
    const { data, error } = await supabase
      .from("quiz_questions")
      .select("*")
      .eq("section_id", section_id);
    if (error) throw new Error(error.message);
    return data;
  },

  async updateQuestion(id: string, updates: Partial<any>) {
    const { data, error } = await supabase
      .from("quiz_questions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async deleteQuestion(id: string) {
    const { data, error } = await supabase
      .from("quiz_questions")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);
    return data;
  },

  // ─────────────── Options ───────────────

  async addOption(option: {
    question_id: string;
    text?: string;
    image?: string;
    audio?: string;
  }) {
    const { data, error } = await supabase
      .from("quiz_options")
      .insert(option)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async getOptionsByQuestion(question_id: string) {
    const { data, error } = await supabase
      .from("quiz_options")
      .select("*")
      .eq("question_id", question_id);
    if (error) throw new Error(error.message);
    return data;
  },

  async updateOption(id: string, updates: Partial<any>) {
    const { data, error } = await supabase
      .from("quiz_options")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async deleteOption(id: string) {
    const { data, error } = await supabase
      .from("quiz_options")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);
    return data;
  },
};
