import {
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  Card,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { TabsContent } from "../ui/tabs";
import { QuizType } from "@/types/quiz";
import { useEffect, useState } from "react";
import { useHasChanges } from "@/hooks/useHasChanges";
import { useChangeHandler } from "@/hooks/useChangeHandler";
import { Check, Clock, RefreshCw, Save } from "lucide-react";
import { Button } from "../ui/button";
import { useAddQuiz, useUpdateQuiz } from "@/queries/quiz";
import toast from "react-hot-toast";
import { formatDuration } from "@/utils/format-duration";
import { useRouter } from "next/navigation";

interface QuizBasicInfoProps {
  quiz: QuizType;
}

const initialData = {
  title: "",
  total_questions: 0,
  total_time: 0,
};

const QuizBasicInfoTab = ({ quiz }: QuizBasicInfoProps) => {
  const [quizData, setQuizData] = useState<Partial<QuizType>>(initialData);
  const { hasChanges, resetInitial } = useHasChanges(
    quiz,
    quizData as QuizType
  );
  const router = useRouter();
  const handleChange = useChangeHandler<QuizType>(setQuizData);

  //   Actions
  const addQuiz = useAddQuiz();
  const updateQuiz = useUpdateQuiz();

  const onSuccess = (data : QuizType) => {
    toast.success("Saved Quiz Basic Info");
    router.push(`/quizzes/${data.id}`);
  };

  const onError = (err: any) => {
    toast.error(err.message);
  };

  //   Handle Save
  const handleSave = () => {
    if (!quizData?.title) {
      toast.error("Quiz title is required");
      return;
    }

    if (quiz?.id) {
      updateQuiz.mutate(
        {
          id: quiz.id,
          updates: quizData,
        },
        {
          onSuccess,
          onError,
        }
      );
    } else {
      addQuiz.mutate(quizData as QuizType, {
        onSuccess,
        onError,
      });
    }
  };

  useEffect(() => {
    if (quiz) {
      const newData = {
        title: quiz.title,
        total_questions: quiz.total_questions ?? 0,
        total_time: quiz.total_time ?? 0,
      };

      setQuizData(newData);
      resetInitial(newData as QuizType);
    }
  }, [quiz]);

  return (
    <TabsContent value="basic" className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4 justify-between">
            <div>
              <CardTitle>Quiz Information</CardTitle>
              <CardDescription>
                Set up the basic details for your quiz
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              {quiz?.id && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Check className="w-3 h-3" /> Saved
                </Badge>
              )}
              <Button
                onClick={handleSave}
                disabled={
                  addQuiz.isPending || updateQuiz.isPending || !hasChanges
                }
              >
                {addQuiz.isPending || updateQuiz.isPending ? (
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Course
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quiz-title">Quiz Title</Label>
              <Input
                id="quiz-title"
                placeholder="Enter quiz title"
                value={quizData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total-time">Total Time (minutes)</Label>
              <Input
                id="total-time"
                type="number"
                placeholder="60"
                value={quizData.total_time}
                onChange={(e) =>
                  handleChange(
                    "total_time",
                    Number.parseInt(e.target.value) || 0
                  )
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-4 pt-4">
            {/* <Badge variant="outline" className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              {quiz.length} Questions
            </Badge> */}
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(quizData?.total_time ?? 0)} Minutes
            </Badge>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default QuizBasicInfoTab;
