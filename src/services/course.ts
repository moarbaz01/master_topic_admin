import { supabase } from "@/lib/supabase/client";
import { CourseType, CreateCourseType, GetCourseParams } from "@/types/course";

export const CourseService = {
  async addCourse(courseData: CreateCourseType): Promise<CourseType> {
    const { data, error } = await supabase
      .from("courses")
      .insert(courseData)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async getCourse(
    params: GetCourseParams = {}
  ): Promise<{ data: CourseType[]; count: number }> {
    const {
      page = 1,
      limit = 10,
      title,
      status,
      level,
      sort = "created_at",
    } = params;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("courses")
      .select("*", { count: "exact" })
      .order(sort, { ascending: false })
      .range(from, to);

    if (title) {
      query = query.ilike("title", title);
    }

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (level && level !== "all") {
      query = query.eq("level", level);
    }

    const { data, error, count } = await query;

    if (error) throw new Error(error.message);

    return {
      data: data ?? [],
      count: count ?? 0,
    };
  },

  async getCourseById(id: string): Promise<CourseType | null> {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async deleteCourse(id: string) {
    const { error } = await supabase.from("courses").delete().eq("id", id);

    if (error) throw new Error(error.message);
  },

  async updateCourse(
    id: string,
    courseData: Partial<CreateCourseType>
  ): Promise<CourseType> {
    const { data, error } = await supabase
      .from("courses")
      .update(courseData)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return data;
  },
};
