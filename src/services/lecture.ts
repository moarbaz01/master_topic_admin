import { supabase } from "@/lib/supabase/client";
import { LectureType, CreateLectureType } from "@/types/course";

export const LectureService = {
  async addLecture(lectureData: CreateLectureType): Promise<LectureType> {
    const { data, error } = await supabase
      .from("lectures")
      .insert(lectureData)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  //   async getLecture(
  //     params: GetLectureParams = {}
  //   ): Promise<{ data: LectureType[]; count: number }> {
  //     const {
  //       page = 1,
  //       limit = 10,
  //       title,
  //       status,
  //       level,
  //       sort = "created_at",
  //     } = params;

  //     const from = (page - 1) * limit;
  //     const to = from + limit - 1;

  //     let query = supabase
  //       .from("lectures")
  //       .select("*", { count: "exact" })
  //       .order(sort, { ascending: false })
  //       .range(from, to);

  //     if (title) {
  //       query = query.ilike("title", title);
  //     }

  //     if (status && status !== "all") {
  //       query = query.eq("status", status);
  //     }

  //     if (level && level !== "all") {
  //       query = query.eq("level", level);
  //     }

  //     const { data, error, count } = await query;

  //     if (error) throw new Error(error.message);

  //     return {
  //       data: data ?? [],
  //       count: count ?? 0,
  //     };
  //   },

  async getLectureById(id: string): Promise<LectureType | null> {
    const { data, error } = await supabase
      .from("lectures")
      .select("*")
      .eq("id", id)

      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async getLecturesByCourseId(courseId: string): Promise<LectureType[] | null> {
    const { data, error } = await supabase
      .from("lectures")
      .select("*", { count: "exact" })
      .order("lesson_number")
      .eq("course_id", courseId);

    if (error) throw new Error(error.message);
    return data ?? [];
  },

  async deleteLecture(id: string): Promise<LectureType | null> {
    const { data, error } = await supabase
      .from("lectures")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);
    return data;
  },

  async updateLecture(
    id: string,
    lectureData: Partial<CreateLectureType>
  ): Promise<LectureType> {
    const { data, error } = await supabase
      .from("lectures")
      .update(lectureData)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return data;
  },
};
