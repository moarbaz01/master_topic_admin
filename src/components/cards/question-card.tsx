import { QuizQuestionType } from "@/types/quiz";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";

interface QuestionCardProps extends QuizQuestionType {
  onEdit: () => {};
  onDelete: () => {};
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  quiz_id,
  section_id,
  type,
  question,
  description,
  correct_answer,
  image,
  audio,
  options = [],
  onEdit,
  onDelete,
}) => {
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="text-base font-semibold">{question}</CardTitle>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button size="icon" variant="outline" onClick={onEdit}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="destructive" onClick={onDelete}>
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <div>
          Type: <span className="font-medium text-foreground">{type}</span>
        </div>
        {description && <div>Description: {description}</div>}
        <div>
          Correct Answer: <strong>{correct_answer}</strong>
        </div>

        {options.length > 0 && (
          <div>
            <div className="font-medium text-foreground">Options:</div>
            <ul className="list-disc list-inside ml-2">
              {options.map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
            </ul>
          </div>
        )}

        {image && (
          <div className="mt-2">
            <Image
              src={image}
              alt="Question"
              width={300}
              height={200}
              className="rounded-md object-cover"
            />
          </div>
        )}

        {audio && (
          <div className="mt-2">
            <audio controls className="w-full">
              <source src={audio} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        )}
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground flex justify-between">
        <div>Quiz ID: {quiz_id}</div>
        <div>Section ID: {section_id}</div>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
