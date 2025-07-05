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
import { X } from "lucide-react";

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
  const [correctAnswer, setCorrectAnswer] = useState("1");
  const [image, setImage] = useState("");
  const [audio, setAudio] = useState("");
  const [options, setOptions] = useState<string[]>([" "]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    if (!question || !correctAnswer) {
      toast.error("Question and correct answer are required");
      return;
    }

    if (questionType === "multiple_choice" && options.length < 4) {
      toast.error("At least 4 options are required");
      return;
    }

    const payload = {
      quiz_id,
      section_id,
      type: questionType,
      question,
      description,
      correct_answer: correctAnswer,
      image,
      audio,
      options,
    };

    console.log("Submit payload:", payload);
    toast.success("Question submitted!");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80%] overflow-y-auto">
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

          {/* Media */}
          <MediaSelectInput value={image} onChange={setImage} label="Image" />
          <MediaSelectInput value={audio} onChange={setAudio} label="Audio" />

          {/* Correct Answer */}
          <div className="space-y-4">
            <Label className="text-gray-400">Correct Answer</Label>
            <Select value={correctAnswer} onValueChange={setCorrectAnswer}>
              <SelectTrigger>
                <SelectValue placeholder="Select Correct Answer" />
              </SelectTrigger>
              <SelectContent>
                {options.map((t, i) =>
                  t.trim() !== "" ? (
                    <SelectItem key={i} value={t}>
                      {i + 1}
                    </SelectItem>
                  ) : null
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Options (Only for multiple choice) */}
          {/* Options Field - Always Visible */}
          <div className="space-y-2">
            <Label>Options</Label>
            {options.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {questionType === "image" || questionType === "audio" ? (
                  <MediaSelectInput
                    value={opt}
                    onChange={(val) => handleOptionChange(idx, val)}
                    label={`Option ${idx + 1}`}
                  />
                ) : (
                  <Input
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    placeholder={`Option ${idx + 1}`}
                  />
                )}
                {options.length > 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(idx)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={addOption}>
              + Add Option
            </Button>
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
