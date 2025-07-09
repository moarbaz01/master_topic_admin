import { supabase } from "@/lib/supabase/client"; // update path as needed
import { BannerType } from "@/types/banner";

export const BannerService = {
  // Get all banners ordered by position
  async getAll(): Promise<BannerType[]> {
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .order("position", { ascending: true });

    if (error) throw new Error(error.message);
    return data as BannerType[];
  },

  // Get single banner by ID
  async getById(id: string): Promise<BannerType | null> {
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data as BannerType;
  },

  // Create new banner
  async create(
    banner: Omit<BannerType, "id" | "created_at">
  ): Promise<BannerType> {
    const { data, error } = await supabase
      .from("banners")
      .insert(banner)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as BannerType;
  },

  // Update existing banner by ID
  async update(
    id: string,
    updates: Partial<Omit<BannerType, "id" | "created_at">>
  ): Promise<BannerType> {
    const { data, error } = await supabase
      .from("banners")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as BannerType;
  },

  // Delete a banner
  async remove(id: string): Promise<void> {
    const { error } = await supabase.from("banners").delete().eq("id", id);

    if (error) throw new Error(error.message);
  },

  // Reorder a banner's position
  async updatePosition(id: string, newPosition: number): Promise<void> {
    const { error } = await supabase
      .from("banners")
      .update({ position: newPosition })
      .eq("id", id);

    if (error) throw new Error(error.message);
  },
};
