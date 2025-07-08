export interface CourseType {
  id: string;
  title: string;
  duration?: number;
  level?: string;
  category?: string;
  rating?: number;
  original_price?: number;
  price?: number;
  progress?: number;
  is_paid: boolean;
  lectures?: LectureType[];
  is_new: boolean;
  thumbnail_color?: string[];
  total_lectures?: number;
  description?: string;
  created_at?: string;
  students_count?: number;
  status?: "draft" | "published" | "archived";
}

export interface GetCourseParams {
  page?: number;
  limit?: number;
  title?: string;
  status?: string;
  level?: string;
  sort?: string;
  order?: string;
}

export type CreateCourseType = Omit<CourseType, "id">;

export interface LectureType {
  id: string;
  course_id: string;
  lesson_number: number;
  title?: string;
  is_locked: boolean;
  duration?: number;
  created_at?: string;
  video_url?: string;
  description?: string;
}

export type CreateLectureType = Omit<LectureType, "id">;
