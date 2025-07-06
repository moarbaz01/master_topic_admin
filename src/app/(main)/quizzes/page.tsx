"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useDeleteQuiz, useGetQuizzes } from "@/queries/quiz";
import QuizModal from "@/components/modals/quiz-modal";
import { Input } from "@/components/ui/input";
import QuizCard from "@/components/cards/quiz-card";
import WarnModal from "@/components/modals/warn-modal";

export default function QuizzesPage() {
  const { data: quizzes } = useGetQuizzes();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const deleteQuiz = useDeleteQuiz();
  const [deleteQuizWarnModal, setDeleteQuizWarnModal] = useState(false);
  const [deleteQuizId, setDeleteQuizId] = useState("");

  const filteredItems = quizzes?.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteQuiz = (id: string) => {
    setDeleteQuizId(id);
    setDeleteQuizWarnModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quizzes</h2>
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Quiz
        </Button>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search media by title..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems && filteredItems?.length > 0 ? (
          filteredItems?.map((quiz) => (
            <QuizCard
              handleDelete={() => handleDeleteQuiz(quiz.id)}
              key={quiz.id}
              {...quiz}
            />
          ))
        ) : (
          <p>No Quiz Found</p>
        )}
      </div>

      <WarnModal
        onC={() => {
          deleteQuiz.mutate(deleteQuizId);
          setDeleteQuizWarnModal(false);
          setDeleteQuizId("")
        }}
        title="Do you want to delete this quiz?"
        desc="If you delete this quiz your all questions, sections will automatically delete"
        open={deleteQuizWarnModal}
        onClose={() => {
          setDeleteQuizWarnModal(false);
          setDeleteQuizId("");
        }}
      />

      <QuizModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
