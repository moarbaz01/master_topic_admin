import {
  Plus,
  Trash2,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  FileText,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { QuizSectionType } from "@/types/quiz";
import { useChangeHandler } from "@/hooks/useChangeHandler";
import {
  useAddQuestion,
  useDeleteSection,
  useGetQuestionsBySection,
  useUpdateSection,
} from "@/queries/quiz";
import toast from "react-hot-toast";
import QuizQuestionItem from "./quiz-question-item";
import { Badge } from "../ui/badge";
import { useHasChanges } from "@/hooks/useHasChanges";

const initialData = {
  quiz_id: "",
  title: "",
  total_questions: 0,
};

const QuizSectionItem = ({ section }: { section: QuizSectionType }) => {
  const [sectionData, setSectionData] =
    useState<Partial<QuizSectionType>>(initialData);
  const { data: questions } = useGetQuestionsBySection(section.id as string);
  const handleChange = useChangeHandler(setSectionData);
  const [isExpanded, setIsExpanded] = useState(false);
  const { hasChanges, resetInitial } = useHasChanges(section, sectionData);

  const addQuestion = useAddQuestion();
  const deleteSection = useDeleteSection();
  const updateSection = useUpdateSection();

  const handleSave = () => {
    updateSection.mutate(
      { id: section?.id ?? "", updates: sectionData },
      {
        onSuccess: () => {
          toast.success("Section updated successfully", {});
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };

  const handleAddQuestion = () => {
    addQuestion.mutate(
      {
        question: "New Quesiton",
        section_id: section?.id ?? "",
        quiz_id: section?.quiz_id ?? "",
        type: "text",
        description: "",
        options: ["", "", "", ""],
      },
      {
        onSuccess: () => {
          toast.success("New Question Added");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };

  useEffect(() => {
    if (section && section?.id) {
      const newData = {
        title: section.title,
        quiz_id: section.quiz_id,
        total_questions: section.total_questions,
      };
      setSectionData(newData);
      resetInitial(newData);
    }
  }, [section]);
  return (
    <Card key={section.id}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Collapsible>
              <CollapsibleTrigger
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 hover:bg-muted p-1 rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </CollapsibleTrigger>
            </Collapsible>
            <Input
              value={sectionData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <Badge variant="secondary">{questions?.length} questions</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleAddQuestion}>
              <Plus className="w-3 h-3 mr-1" />
              Add Question
            </Button>
            <Button
              onClick={handleSave}
              disabled={updateSection.isPending || !hasChanges}
              size="sm"
            >
              {updateSection.isPending ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => deleteSection.mutate(section?.id)}
            >
              {deleteSection.isPending ? (
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="w-3 h-3" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <Collapsible open={isExpanded}>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {questions?.map((question, questionIndex) => (
              <QuizQuestionItem
                key={question.id}
                question={question}
                index={questionIndex}
              />
            ))}

            {questions?.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No questions in this section yet</p>
                <Button
                  variant="outline"
                  className="mt-2 bg-transparent"
                  onClick={handleAddQuestion}
                >
                  Add First Question
                </Button>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default QuizSectionItem;
