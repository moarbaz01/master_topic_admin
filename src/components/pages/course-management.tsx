"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseBasicInfo from "../course/course-basic-info";
import CourseLectures from "../course/course-lectures";
import CoursePreview from "../course/course-preview";
import { CourseType } from "@/types/course";
import { useCourseById } from "@/queries/course";

interface Lecture {
  id: string;
  course_id: string;
  lesson_number: number;
  title?: string;
  is_locked: boolean;
  duration?: number;
  created_at?: string;
}

interface CourseManagementProps {
  courseId?: string;
  initialData?: {
    course: CourseType;
    lectures: Lecture[];
  };
}

export default function CourseManagement({ courseId }: CourseManagementProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const { data: initialData } = useCourseById(courseId as string);

  return (
    <div className=" max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Course Management</h1>
        <p className="text-muted-foreground">
          Create and manage your courses and lectures
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Course Info</TabsTrigger>
          <TabsTrigger value="lectures">Lectures</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <CourseBasicInfo course={initialData as CourseType} />
        </TabsContent>

        <TabsContent value="lectures">
          <CourseLectures course={initialData as CourseType} />
        </TabsContent>

        <TabsContent value="preview">
          <CoursePreview course={initialData as CourseType} />
        </TabsContent>
      </Tabs>

      {/* <div className="flex items-center justify-between pt-6 border-t">
        <div className="text-sm text-muted-foreground">
          {lectures.length} lectures • {formatDuration(getTotalDuration())}{" "}
          total duration
          {course.id && (
            <Badge variant="outline" className="ml-2">
              Course Saved
            </Badge>
          )}
        </div>
      </div> */}
    </div>
  );
}
