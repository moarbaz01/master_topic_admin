// services/media-service.ts

import { supabase } from "@/lib/supabase/client";
import type { MediaType, CreateMediaType, GetMediaParams } from "@/types/media";

export const MediaService = {
  async addMedia(mediaData: CreateMediaType): Promise<MediaType | null> {
    const { data, error } = await supabase
      .from("media")
      .insert(mediaData)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async getMedia(
    params: GetMediaParams = {}
  ): Promise<{ data: MediaType[]; count: number }> {
    const { page = 1, limit = 10, type, name, tag } = params;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("media")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (type && type !== "none") {
      query = query.eq("type", type);
    }
    if (name) {
      query = query.ilike("name", `%${name}%`);
    }

    if (tag && tag !== "none") {
      query = query.contains("tags", [tag]); // means: tags contains [tag]
    }

    const { data, error, count } = await query;

    if (error) throw new Error(error.message);

    return {
      data: data ?? [],
      count: count ?? 0,
    };
  },

  async getMediaById(id: string): Promise<MediaType | null> {
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async deleteMedia(id: string): Promise<MediaType[] | null> {
    const { data, error } = await supabase.from("media").delete().eq("id", id);

    if (error) throw new Error(error.message);
    return data;
  },

  async updateMedia(
    id: string,
    mediaData: Partial<CreateMediaType>
  ): Promise<MediaType> {
    const { data, error } = await supabase
      .from("media")
      .update(mediaData)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return data;
  },
};
