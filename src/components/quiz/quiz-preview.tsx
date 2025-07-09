import { QuizSectionType, QuizType } from "@/types/quiz";
import {
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  Card,
} from "../ui/card";
import { TabsContent } from "../ui/tabs";
import { FileText } from "lucide-react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import {
  useGetQuestionsBySection,
  useGetSectionsByQuizId,
} from "@/queries/quiz";

const QuizPreviewTab = ({ quiz }: { quiz: QuizType }) => {
  const { data: sections } = useGetSectionsByQuizId(quiz?.id);
  return (
    <TabsContent value="preview" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Quiz Preview
          </CardTitle>
          <CardDescription>Review your quiz before saving</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {quiz?.title || "Untitled Quiz"}
                </div>
                <p className="text-sm text-muted-foreground">Quiz Title</p>
              </CardContent>
            </Card>
            {/* <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{questions.length}</div>
                <p className="text-sm text-muted-foreground">Total Questions</p>
              </CardContent>
            </Card> */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{quiz?.total_time} min</div>
                <p className="text-sm text-muted-foreground">Time Limit</p>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sections Overview</h3>
            {sections?.map((section, index) => (
              <SectionItem key={section.id} section={section} index={index} />
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default QuizPreviewTab;

const SectionItem = ({
  section,
  index,
}: {
  section: QuizSectionType;
  index: number;
}) => {
  const { data: questions } = useGetQuestionsBySection(section.id);
  return (
    <Card key={section.id}>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">{section.title}</h4>
            <p className="text-sm text-muted-foreground">
              {questions?.length ?? 0} questions
            </p>
          </div>
          <Badge variant="outline">Section {index + 1}</Badge>
        </div>

        <div className="flex flex-wrap mt-4 gap-4">
          {questions?.map((question, index) => (
            <div
              className="h-8 w-8 rounded-lg p-2 text-lg flex items-center justify-center bg-primary text-white"
              key={question.id}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
