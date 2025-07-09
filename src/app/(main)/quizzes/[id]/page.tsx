"use client";

import QuizManagement from "@/components/pages/quiz-management";
import { useParams } from "next/navigation";

export default function CourseEditPage() {
  const params = useParams();
  const quiz_id = params.id as string;

  return <QuizManagement quiz_id={quiz_id as string} />;
}
