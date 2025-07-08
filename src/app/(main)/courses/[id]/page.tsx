"use client";

import CourseManagement from "@/components/pages/course-management";
import { useCourseById } from "@/queries/course";
import { useParams } from "next/navigation";

export default function CourseEditPage() {
  const params = useParams();
  const courseId = params.id as string;

  console.log("Course Id", courseId)

  return <CourseManagement courseId={courseId} />;
}
