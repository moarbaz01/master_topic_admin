import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Plus, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAddSection, useGetSectionsByQuizId } from "@/queries/quiz";
import { QuizType } from "@/types/quiz";
import toast from "react-hot-toast";
import QuizSectionItem from "./quiz-section-item";

const QuizSectionTab = ({ quiz }: { quiz: QuizType }) => {
  const { data: sections, isLoading } = useGetSectionsByQuizId(
    quiz?.id as string
  );
  const addSection = useAddSection();

  //   Handle Add Section
  const handleAddSection = () => {
    addSection.mutate(
      {
        quiz_id: quiz?.id as string,
        title: "New Section",
        total_questions: 0,
      },
      {
        onSuccess: () => {
          toast.success("Section added successfully", {});
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };
  return (
    <TabsContent value="sections" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Sections & Questions</h2>
          <p className="text-muted-foreground">
            Organize your quiz into sections and add questions
          </p>
        </div>
        <Button
          onClick={handleAddSection}
          disabled={!quiz?.id}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Section
        </Button>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {sections?.map((section) => (
            <QuizSectionItem key={section.id} section={section} />
          ))}

          {sections?.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No sections yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by creating your first section to organize your quiz
                  questions
                </p>
                <Button onClick={handleAddSection}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Section
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>
    </TabsContent>
  );
};

export default QuizSectionTab;
