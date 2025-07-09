"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Search } from "lucide-react";
import { useDeleteQuiz, useGetQuizzes } from "@/queries/quiz";
import QuizModal from "@/components/modals/quiz-modal";
import { Input } from "@/components/ui/input";
import QuizCard from "@/components/cards/quiz-card";
import WarnModal from "@/components/modals/warn-modal";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function QuizzesPage() {
  const { data: quizzes } = useGetQuizzes();
  const [showModal, setShowModal] = useState(false);

  const [titleSearch, setTitleSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  
  const deleteQuiz = useDeleteQuiz();
  const [deleteQuizWarnModal, setDeleteQuizWarnModal] = useState(false);
  const [deleteQuizId, setDeleteQuizId] = useState("");
  const router = useRouter();

  const filteredItems = quizzes?.filter((item) =>
    item.title.toLowerCase().includes(titleSearch.toLowerCase())
  );

  const handleDeleteQuiz = (id: string) => {
    setDeleteQuizId(id);
    setDeleteQuizWarnModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Quizzes</h1>
          <p className="text-muted-foreground">
            Manage and track your quiz portfolio
          </p>
        </div>
        <Button
          onClick={() => router.push("/quizzes/new")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Course
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <CardTitle className="text-lg">Filters</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-10"
                value={titleSearch}
                onChange={(e) => setTitleSearch(e.target.value)}
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Date Created</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                {/* <SelectItem value="students_count">Students</SelectItem> */}
                {/* <SelectItem value="rating">Rating</SelectItem> */}
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

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
          setDeleteQuizId("");
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
