import { useDeleteSection } from "@/queries/quiz";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleQuestionMark, Edit, Trash } from "lucide-react";
import { QuizSectionType } from "@/types/quiz";

interface QuizSectionCardProps extends QuizSectionType {
  handleAddQuestion: (section_id: string) => void;
}

const QuizSectionCard = ({
  id,
  title,
  total_questions,
  handleAddQuestion,
}: QuizSectionCardProps) => {
  const deleteSection = useDeleteSection();

  return (
    <Card className="rounded-xl border shadow-sm">
      <CardHeader className="bg-muted px-6 py-4 rounded-t-xl flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Section: {title}
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Questions: {total_questions}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => deleteSection.mutate(id)}
            variant="destructive"
            size="icon"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-4 text-sm text-muted-foreground">
        {/* Add section notes or short description here */}
        No description provided.
      </CardContent>

      <CardFooter className="bg-muted rounded-b-xl px-6 py-3 flex justify-end">
        <Button onClick={() => handleAddQuestion(id as string)}>
          <CircleQuestionMark className="w-4 h-4 mr-2" />
          Add Question
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizSectionCard;
