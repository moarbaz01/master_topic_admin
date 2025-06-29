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
import { Label } from "../ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MediaSelectInput } from "../media-select";

const questionTypes = [
  { value: "text", label: "Text Question" },
  { value: "image", label: "Image-Based Question" },
  { value: "audio", label: "Audio-Based Question" },
  { value: "multiple_choice", label: "Multiple Choice" },
];

export default function QuizQuestionModal({
  open,
  onClose,
  quiz_id,
  section_id,
}: {
  open: boolean;
  onClose: () => void;
  quiz_id: string;
  section_id: string;
}) {
  const [questionType, setQuestionType] = useState("text");
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [image, setImage] = useState("");
  const [audio, setAudio] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleSubmit = () => {
    // Validate fields based on type
    if (!question || !correctAnswer) {
      toast.error("Question and correct answer are required");
      return;
    }

    // Example payload
    const payload = {
      quiz_id,
      section_id,
      type: questionType,
      question,
      description,
      correct_answer: correctAnswer,
      image,
      audio,
      options: questionType,
    };

    console.log("Submit payload:", payload);
    toast.success("Question submitted!");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Question</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Question Type */}
          <div className="space-y-4">
            <Label className="text-gray-400">Question Type</Label>
            <Select value={questionType} onValueChange={setQuestionType}>
              <SelectTrigger>
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                {questionTypes.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <Label>Question</Label>
            <Textarea
              placeholder="Write your question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-4">
            <Label>Description (optional)</Label>
            <Textarea
              placeholder="Explain the question (if needed)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <MediaSelectInput value={image} onChange={setImage} label="Image" />

          <MediaSelectInput value={audio} onChange={setAudio} label="Audio " />

          {/* Correct Answer */}
          <div className="space-y-4">
            <Label>Correct Answer</Label>
            <Input
              placeholder="Enter correct answer"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Question</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
