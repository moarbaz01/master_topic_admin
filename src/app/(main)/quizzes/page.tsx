"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Clock, ListTodo, Pencil, Search } from "lucide-react";
import { useGetQuizzes } from "@/queries/quiz";
import QuizModal from "@/components/modals/quiz-modal";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function QuizzesPage() {
  const { data: quizzes } = useGetQuizzes();
  const [showModal, setShowModal] = useState(false);
  const [editQuiz, setEditQuiz] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredItems = quizzes?.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quizzes</h2>
        <Button
          onClick={() => {
            setEditQuiz(null);
            setShowModal(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Quiz
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search media by title..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems?.map((quiz) => (
          <Card key={quiz.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-base">{quiz.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ListTodo className="w-4 h-4" />
                  {quiz.total_questions} Questions
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4" />
                  {quiz.total_time} mins
                </div>
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  router.push(`/quizzes/${quiz.id}`);
                }}
              >
                <Pencil className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <QuizModal
        open={showModal}
        onClose={() => setShowModal(false)}
        isEdit={!!editQuiz}
        quiz={editQuiz}
      />
    </div>
  );
}
