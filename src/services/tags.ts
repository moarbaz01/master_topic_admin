import { supabase } from "../lib/supabase/client";

// Service
export const TagsService = {
  async addTags(name: string) {
    const { data, error } = await supabase.from("tags").insert({ name });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  async getTags() {
    const { data, error } = await supabase.from("tags").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  async deleteTags(id: string) {
    const { data, error } = await supabase.from("tags").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  async updateTags(id: string, name: string) {
    const { data, error } = await supabase
      .from("tags")
      .update({ name })
      .eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
};
