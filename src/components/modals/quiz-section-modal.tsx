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
import { useAddSection } from "@/queries/quiz";
import { toast } from "react-hot-toast";
import { Label } from "../ui/label";

export default function QuizSectionModal({
  open,
  onClose,
  quiz_id,
}: {
  open: boolean;
  onClose: () => void;
  quiz_id: string;
}) {
  const [title, setTitle] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);

  const addQuizSection = useAddSection();

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Quiz title is required");
      return;
    }

    addQuizSection.mutate(
      {
        quiz_id,
        title,
        total_questions: totalQuestions,
      },
      {
        onSuccess: () => {
          toast.success("Quiz created successfully");
          onClose();
        },
      }
    );
  };

  const handleCloseModal = () => {
    onClose();
    setTitle("");
    setTotalQuestions(0);
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{"Create Quiz Section"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-4">
            <Label className="text-gray-400">Section Title</Label>
            <Input
              placeholder="Title"
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
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={addQuizSection.isPending} onClick={handleSubmit}>
            {addQuizSection.isPending ? "Loading" : "Create Section"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
