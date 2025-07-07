import { supabase } from "@/lib/supabase/client";

export const VocabularyService = {
  // -------------------- Vocabulary --------------------
  async createVocabulary(title: string) {
    const { data, error } = await supabase
      .from("vocabulary")
      .insert({ title })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getAllVocabularies() {
    const { data, error } = await supabase
      .from("vocabulary")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async getVocabularyById(id: string) {
    const { data, error } = await supabase
      .from("vocabulary")
      .select("*")
      .eq("id", id)
      .order("created_at", { ascending: false })
      .single();
    if (error) throw error;
    return data;
  },

  async updateVocabulary(id: string, title: string) {
    const { data, error } = await supabase
      .from("vocabulary")
      .update({ title })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteVocabulary(id: string) {
    const { error } = await supabase.from("vocabulary").delete().eq("id", id);
    if (error) throw error;
    return true;
  },

  // -------------------- Section --------------------
  async createSection(title: string, vocabulary_id: string) {
    const { data, error } = await supabase
      .from("vocabulary_section")
      .insert({ title, vocabulary_id })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getSections(vocabulary_id: string) {
    const { data, error } = await supabase
      .from("vocabulary_section")
      .select("*")
      .eq("vocabulary_id", vocabulary_id)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async updateSection(id: string, title: string) {
    const { data, error } = await supabase
      .from("vocabulary_section")
      .update({ title })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteSection(id: string) {
    const { error } = await supabase
      .from("vocabulary_section")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return true;
  },

  // -------------------- Word --------------------
  async createWord(
    section_id: string,
    word: string,
    definition: string,
    image?: string | null,
    audio?: string | null
  ) {
    const { data, error } = await supabase
      .from("vocabulary_word")
      .insert({ section_id, word, definition, image, audio })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getWords(section_id: string) {
    const { data, error } = await supabase
      .from("vocabulary_word")
      .select("*")
      .eq("section_id", section_id)
      .order("word", { ascending: true });
    if (error) throw error;
    return data;
  },

  async updateWord(
    id: string,
    payload: {
      word?: string;
      definition?: string;
      image?: string | null;
      audio?: string | null;
    }
  ) {
    const { data, error } = await supabase
      .from("vocabulary_word")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteWord(id: string) {
    const { error } = await supabase
      .from("vocabulary_word")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return true;
  },
};
