"use client";

import { ArrowLeft, Plus } from "lucide-react";
import {
  useAddSection,
  useAddQuestion,
  useAddOption,
  useDeleteSection,
  useDeleteQuestion,
  useDeleteOption,
  useUpdateSection,
  useUpdateQuestion,
  useUpdateOption,
  useGetQuizById,
  useGetSectionsByQuizId,
} from "@/queries/quiz";
import { useParams, useRouter } from "next/navigation";
import EditQuizInformation from "@/components/edit-quiz-information";
import { Button } from "@/components/ui/button";
import QuizSectionModal from "@/components/modals/quiz-section-modal";
import { useState } from "react";
import QuizQuestionModal from "@/components/modals/quiz-question-modal";
import QuizSectionCard from "@/components/quiz-section-card";

export default function QuizEditPage() {
  const { id } = useParams();
  const { data: quiz, isLoading } = useGetQuizById(id as string);
  const { data: sections } = useGetSectionsByQuizId(id as string);
  const [currentSectionId, setCurrentSectionId] = useState("");

  console.log(sections);
  const [openSectionModal, setOpenSectionModal] = useState(false);
  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const router = useRouter();

  // const addSection = useAddSection();
  // const addQuestion = useAddQuestion();
  // const addOption = useAddOption();

  // const deleteSection = useDeleteSection();
  // const deleteOption = useDeleteOption();

  // const updateSection = useUpdateSection();
  // const updateQuestion = useUpdateQuestion();
  // const updateOption = useUpdateOption();

  const handleAddQuestion = (section_id: string) => {
    setCurrentSectionId(section_id);
    setOpenQuestionModal(true);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-6 ">
      <div className="flex items-center space-x-4">
        <div
          onClick={() => router.back()}
          className="hover:opacity-80 cursor-pointer"
        >
          <ArrowLeft />
        </div>
        <h1 className="text-2xl font-bold">{quiz?.title}</h1>
      </div>

      <EditQuizInformation id={id as string} />

      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold">Sections</h2>
        <Button onClick={() => setOpenSectionModal(true)}>
          <Plus />
          Add Section
        </Button>
      </div>

      <div className="space-y-6">
        {sections?.map((sec) => (
          <QuizSectionCard
            key={sec.id}
            handleAddQuestion={handleAddQuestion}
            title={sec.title}
            quiz_id={id as string}
            id={sec.id}
            total_questions={sec.total_questions}
          />
        ))}
      </div>

      <QuizSectionModal
        open={openSectionModal}
        onClose={() => setOpenSectionModal(false)}
        quiz_id={quiz.id}
      />
      <QuizQuestionModal
        open={openQuestionModal}
        onClose={() => setOpenQuestionModal(false)}
        quiz_id={quiz.id}
        section_id={currentSectionId}
      />
    </div>
  );
}
