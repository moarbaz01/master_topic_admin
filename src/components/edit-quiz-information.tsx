import { useGetQuizById, useUpdateQuiz } from "@/queries/quiz";
import { useState } from "react";
import toast from "react-hot-toast";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const EditQuizInformation = ({ id }: { id: string }) => {
  const { data: quiz, isLoading } = useGetQuizById(id as string);
  const [title, setTitle] = useState(quiz?.title ?? "");
  const [totalTime, setTotalTime] = useState(quiz?.total_time ?? 0);
  const [totalQuestions, setTotalQuestions] = useState(
    quiz?.total_questions ?? 0
  );
  const updateQuiz = useUpdateQuiz();

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Quiz title is required");
      return;
    }

    if (quiz?.id) {
      updateQuiz.mutate(
        {
          id: quiz.id,
          updates: {
            title,
            total_questions: totalQuestions,
            total_time: totalTime,
          },
        },
        {
          onSuccess: () => {
            toast.success("Quiz updated successfully");
          },
        }
      );
    }
  };

  return (
    <Card className=" max-w-3xl mt-4">
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <Label >Quiz Title</Label>
          <Input
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          <Label >Total Questions</Label>
          <Input
            type="number"
            placeholder="Total Questions"
            value={totalQuestions === 0 ? "" : totalQuestions}
            onChange={(e) => setTotalQuestions(Number(e.target.value) || 0)}
            inputMode="numeric"
            className="hide-spin"
          />
        </div>
        <div className="space-y-4">
          <Label >Total Time</Label>
          <Input
            type="number"
            placeholder="Total Time (in minutes)"
            value={totalTime === 0 ? "" : totalTime}
            onChange={(e) => setTotalTime(Number(e.target.value) || 0)}
            inputMode="numeric"
            className="hide-spin"
          />
        </div>
        <Button disabled={updateQuiz.isPending} onClick={handleSubmit}>
          {updateQuiz.isPending ? "Loading" : "Update Quiz"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EditQuizInformation