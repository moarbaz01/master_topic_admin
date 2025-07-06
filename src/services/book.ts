// services/media-service.ts

import { supabase } from "@/lib/supabase/client";
import { BookType, CreateBookType, GetBookParams } from "@/types/book";
import { MediaType } from "@/types/media";

export const BookService = {
  async addBook(bookData: CreateBookType): Promise<BookType> {
    const { data, error } = await supabase
      .from("book")
      .insert(bookData)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async getBook(
    params: GetBookParams = {}
  ): Promise<{ data: BookType[]; count: number }> {
    const { page = 1, limit = 10, title } = params;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("book")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (title) {
      query = query.ilike("title", `%${title}%`);
    }

    const { data, error, count } = await query;

    if (error) throw new Error(error.message);

    return {
      data: data ?? [],
      count: count ?? 0,
    };
  },

  async getBookById(id: string): Promise<BookType | null> {
    const { data, error } = await supabase
      .from("book")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async deleteBook(id: string): Promise<MediaType | null> {
    const { data, error } = await supabase.from("book").delete().eq("id", id);

    if (error) throw new Error(error.message);
    return data;
  },

  async updateBook(
    id: string,
    bookData: Partial<CreateBookType>
  ): Promise<MediaType> {
    const { data, error } = await supabase
      .from("book")
      .update(bookData)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return data;
  },
};
