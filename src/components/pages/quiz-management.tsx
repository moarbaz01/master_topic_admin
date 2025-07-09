"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetQuizById } from "@/queries/quiz";
import QuizSectionTab from "../quiz/quiz-sections";
import QuizBasicInfoTab from "@/components/quiz/quiz-basic-info";
import QuizPreviewTab from "../quiz/quiz-preview";

export default function Component({ quiz_id }: { quiz_id?: string }) {
  const [activeTab, setActiveTab] = useState("basic");
  const { data: initialData, isLoading } = useGetQuizById(quiz_id as string);

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Quiz Management</h1>
        <p className="text-muted-foreground">
          Create and manage your quizzes, sections, and questions
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="sections">Sections & Questions</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <QuizBasicInfoTab quiz={initialData} />
        <QuizSectionTab quiz={initialData} />
        <QuizPreviewTab quiz={initialData} />
      </Tabs>

      {/* <div className="flex items-center justify-between pt-6 border-t">
        <div className="text-sm text-muted-foreground">
          {questions.length} questions across {sections.length} sections
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Quiz
          </Button>
        </div>
      </div> */}
    </div>
  );
}
