import { useDeleteSection } from "@/queries/quiz";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
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
    <Card className="p-0 rounded-xl">
      <CardHeader className="flex items-center bg-gray-200 rounded-t-xl py-4 justify-between">
        <div>
          <h2 className="text-lg font-bold">Title : {title}</h2>
          <p>Questions : {total_questions}</p>
        </div>
        <div className="space-x-4">
          <Button variant="outline" size="icon">
            <Edit />
          </Button>
          <Button
            onClick={() => deleteSection.mutate(id)}
            className="bg-red-500 hover:bg-red-400 transition text-white"
            size="icon"
          >
            <Trash />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="min-h-20">Hello</CardContent>
      <CardFooter className=" py-4 bg-gray-200 rounded-b-xl flex justify-end">
        <Button
          variant="default"
          onClick={() => handleAddQuestion(id as string)}
        >
          <CircleQuestionMark />
          Add Question
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizSectionCard;
