import {
  Trash2,
  ImageIcon,
  Volume2,
  RefreshCw,
  Save,
  Image,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuizQuestionType } from "@/types/quiz";
import { questionTypes } from "../../../data";
import { useEffect, useState } from "react";
import { useChangeHandler } from "@/hooks/useChangeHandler";
import { useDeleteQuestion, useUpdateQuestion } from "@/queries/quiz";
import { useHasChanges } from "@/hooks/useHasChanges";
import toast from "react-hot-toast";
import OptionField from "./option-field";
import { MediaSelectInput } from "../media-select";

const initialQuizQuestion: QuizQuestionType = {
  id: "", // should be dynamically generated when used
  quiz_id: "",
  section_id: "",
  type: "text", // default type
  question: "",
  description: "",
  image: "",
  audio: "",
  images: [],
  options: ["", "", "", ""], // default 4 options
  correct_answer: "",
};

const QuizQuestionItem = ({
  question,
  index,
}: {
  question: QuizQuestionType;
  index: number;
}) => {
  const [questionData, setQuestionData] =
    useState<Partial<QuizQuestionType>>(initialQuizQuestion);
  const handleChange = useChangeHandler(setQuestionData);
  const { hasChanges, resetInitial } = useHasChanges(question, questionData);

  const updateQuestion = useUpdateQuestion();
  const deleteQuestion = useDeleteQuestion();
  const handleSave = () => {
    if (!questionData) return;

    if (!questionData.question || !question.type) {
      toast.error("Question and type are required");
      return;
    }

    updateQuestion.mutate(
      { id: question?.id ?? "", updates: questionData },
      {
        onSuccess: () => {
          toast.success("Question Saved");
        },
        onError: (err) => toast.error(err.message),
        onSettled: () => console.log("settled"), // called after onSuccess or err
      }
    );
  };

  const handleChangeQuestionOption = (index: number, value: string) => {
    const newOptions = [...questionData.options!];
    newOptions[index] = value;
    handleChange("options", newOptions);
  };

  useEffect(() => {
    if (question) {
      const newData: QuizQuestionType = {
        id: question.id,
        quiz_id: question.quiz_id,
        section_id: question.section_id,
        type: question.type || "multiple_choice",
        question: question.question || "",
        description: question.description || "",
        image: question.image || "",
        audio: question.audio || "",
        images: question.images ?? [],
        options: question.options ?? ["", "", "", ""],
        correct_answer: question.correct_answer || "",
      };
      setQuestionData(newData);
      resetInitial(newData);
    }
  }, [question]);
  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Q{index + 1}</Badge>
              <Select
                value={questionData.type}
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {questionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Textarea
              placeholder="Enter your question"
              value={questionData.question}
              onChange={(e) => handleChange("question", e.target.value)}
              className="min-h-[60px]"
            />
            <Input
              placeholder="Optional description"
              value={questionData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSave}
              disabled={updateQuestion.isPending || !hasChanges}
              size="sm"
            >
              {updateQuestion.isPending ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => deleteQuestion.mutate(question?.id)}
              disabled={deleteQuestion.isPending}
              className="text-destructive hover:text-destructive bg-transparent"
            >
              {deleteQuestion.isPending ? (
                <RefreshCw className="w-3 h-3 animate-spin" />
              ) : (
                <Trash2 className="w-3 h-3" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Media Upload Section */}
        <div className="flex gap-2">
          <MediaSelectInput
            label="Add Image"
            icon={<Image />}
            value={questionData.image}
            variant="compact"
            onChange={(e) => handleChange("image", e)}
          />
          <MediaSelectInput
            label="Add Audio"
            icon={<Volume2 />}
            value={questionData.audio}
            variant="compact"
            onChange={(e) => handleChange("audio", e)}
          />
        </div>

        <div className="space-y-2">
          <Label>Correct Answer</Label>
          <Select
            value={questionData.correct_answer}
            onValueChange={(value) => handleChange("correct_answer", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select correct answer" />
            </SelectTrigger>
            <SelectContent>
              {questionData.options?.map((option, index) => (
                <SelectItem key={index} value={`${index + 1}`}>
                  {`Option ${index + 1}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Question Options */}

        <div className="space-y-2">
          <Label>Answer Options</Label>

          <div className="space-y-2">
            {questionData?.options?.map((option, index) => (
              <OptionField
                key={index}
                type={questionData?.type ?? "text"}
                label={`Option ${index + 1}`}
                value={option}
                index={index}
                onChange={(newValue) =>
                  handleChangeQuestionOption(index, newValue)
                }
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizQuestionItem;
