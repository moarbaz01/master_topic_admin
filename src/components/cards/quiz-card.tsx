"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Clock, Edit, ListTodo, Trash } from "lucide-react";
import { QuizType } from "@/types/quiz";
import { useRouter } from "next/navigation";

const QuizCard = ({
  id,
  title,
  total_questions,
  total_time,
  handleDelete,
}: QuizType & { handleDelete: () => void }) => {
  const router = useRouter();
  return (
    <Card key={id} className="flex flex-col justify-between p-4">
      <CardHeader className="p-0 space-y-1">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground space-y-1">
          <div className="flex items-center gap-2">
            <ListTodo className="w-4 h-4" />
            {total_questions} Questions
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {total_time} mins
          </div>
        </CardDescription>
      </CardHeader>

      <CardFooter className="p-0 mt-3 flex justify-end gap-2">
        <Button
          onClick={() => router.push(`/quizzes/${id}`)}
          size="icon"
          variant="outline"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-400 transition text-white"
          size="icon"
          onClick={handleDelete}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
