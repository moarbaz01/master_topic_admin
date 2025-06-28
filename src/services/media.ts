import { supabase } from "@/lib/supabase/client";

export interface MediaType {
  id?: string;
  type: string;
  name: string;
  url: string;
  size: number;
  publicId: string;
  format?: string;
  duration?: number;
  width?: number;
  height?: number;
}

export const MediaServices = {
  async addMedia(mediaData: MediaType) {
    const { data, error } = await supabase.from("media").insert(mediaData);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  async getMedia() {
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  async getMediaById(id: string) {
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  async deleteMedia(id: string) {
    const { data, error } = await supabase.from("media").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  async updateMedia(id: string, mediaData: any) {
    const { data, error } = await supabase
      .from("media")
      .update(mediaData)
      .eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
};
