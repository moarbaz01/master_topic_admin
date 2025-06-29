"use client";

import {
  ArrowLeft,
  CircleQuestionMark,
  Edit,
  FileQuestion,
  Plus,
  Timer,
  Trash,
} from "lucide-react";
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import QuizQuestionModal from "@/components/modals/quiz-question-modal";

export default function QuizEditPage() {
  const { id } = useParams();
  const { data: quiz, isLoading } = useGetQuizById(id as string);
  const { data: sections } = useGetSectionsByQuizId(id as string);
  const [currentSectionId, setCurrentSectionId] = useState("");

  console.log(sections);
  const [openSectionModal, setOpenSectionModal] = useState(false);
  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const router = useRouter();

  const addSection = useAddSection();
  const addQuestion = useAddQuestion();
  const addOption = useAddOption();

  const deleteSection = useDeleteSection();
  const deleteQuestion = useDeleteQuestion();
  const deleteOption = useDeleteOption();

  const updateSection = useUpdateSection();
  const updateQuestion = useUpdateQuestion();
  const updateOption = useUpdateOption();

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
        {sections?.map((sec, index) => (
          <Card key={index} className="p-0 rounded-none">
            <CardHeader className="bg-gray-800 flex items-center py-4 justify-between">
              <div>
                <h2 className="text-lg font-bold">Title : {sec.title}</h2>
                <p>Questions : {sec.total_questions}</p>
              </div>
              <div className="space-x-4">
                <Button variant="outline" size="icon">
                  <Edit />
                </Button>
                <Button
                  onClick={() => deleteSection.mutate(sec.id)}
                  className="bg-red-500 hover:bg-red-400 transition text-white"
                  size="icon"
                >
                  <Trash />
                </Button>
              </div>
            </CardHeader>
            <CardContent>Hello</CardContent>
            <CardFooter className=" py-4  flex justify-end">
              <Button
                variant="default"
                onClick={() => handleAddQuestion(sec.id as string)}
              >
                <CircleQuestionMark />
                Add Question
              </Button>
            </CardFooter>
          </Card>
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
