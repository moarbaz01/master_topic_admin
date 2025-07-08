"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddQuiz } from "@/queries/quiz";
import { toast } from "react-hot-toast";
import { Label } from "../ui/label";

export default function QuizModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const addQuiz = useAddQuiz();

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Quiz title is required");
      return;
    }

    addQuiz.mutate(
      {
        title,
        total_questions: totalQuestions,
        total_time: totalTime,
      },
      {
        onSuccess: () => {
          toast.success("Quiz created successfully");
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{"Create Quiz"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-4">
            <Label className="text-gray-400">Quiz Title</Label>
            <Input
              placeholder="Quiz Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-4">
            <Label className="text-gray-400">Total Questions</Label>
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
            <Label className="text-gray-400">Total Time</Label>
            <Input
              type="number"
              placeholder="Total Time (in minutes)"
              value={totalTime === 0 ? "" : totalTime}
              onChange={(e) => setTotalTime(Number(e.target.value) || 0)}
              inputMode="numeric"
              className="hide-spin"
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={addQuiz.isPending} onClick={handleSubmit}>
            {addQuiz.isPending ? "Loading" : "Create Quiz"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
