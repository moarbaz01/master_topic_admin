import { GetTagsParams, TagType } from "@/types/tag";
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

  async getTagsAll() : Promise<{ data: TagType[]; count: number }> {
    let query = supabase
      .from("tags")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    const { data, error, count } = await query;
    if (error) {
      throw new Error(error.message);
    }
    return { data: data ?? [], count: count ?? 0 };
  },

  // Get Tags
  async getTags(
    params: GetTagsParams = {}
  ): Promise<{ data: TagType[]; count: number }> {
    const { page = 1, limit = 10, name } = params;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("tags")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (name) {
      query = query.ilike("name", `%${name}%`);
    }

    const { data, error, count } = await query;
    if (error) {
      throw new Error(error.message);
    }
    return { data: data ?? [], count: count ?? 0 };
  },

  // Delete Tags
  async deleteTags(id: string) {
    const { data, error } = await supabase.from("tags").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  // Update Tags
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
