"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, RefreshCw, PlayCircle, AlertCircle } from "lucide-react";
import LectureItem from "@/components/course/lecture-item";
import { CourseType } from "@/types/course";
import { useAddLecture, useLecturesByCourseId } from "@/queries/lecture";
import toast from "react-hot-toast";

interface CourseLecturesProps {
  course: CourseType;
}

export default function CourseLectures({ course }: CourseLecturesProps) {
  const { data: allLectures, isLoading } = useLecturesByCourseId(course?.id);
  const addLecture = useAddLecture();
  const handleAddLecture = () => {
    addLecture.mutate(
      {
        title: "New Lecture",
        is_locked: false,
        lesson_number: allLectures?.length ? allLectures.length + 1 : 1,
        description: "",
        duration: 0,
        video_url: "",
        course_id: course?.id,
      },
      {
        onSuccess: () => {
          toast.success("Lectures is added");
        },
        onError: (error) => {
          toast.error("Error in adding lecture");
          console.log(error.message);
        },
      }
    );
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Course Lectures</h2>
          <p className="text-muted-foreground">
            Manage your course content and structure
          </p>
        </div>
        <Button
          onClick={handleAddLecture}
          disabled={addLecture.isPending || !course?.id}
          className="flex items-center gap-2"
        >
          {addLecture.isPending ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Add Lecture
        </Button>
      </div>
      {/* 
      // {allLectures && allLectures.length > 0 && (
      //   <Card className="border-amber-200 bg-amber-50">
      //     <CardContent className="p-4 flex items-center gap-2">
      //       <AlertCircle className="w-4 h-4 text-amber-600" />
      //       <p className="text-amber-800">
      //         Please save the course information first before adding lectures.
      //       </p>
      //     </CardContent>
      //   </Card>
      // )} */}

      {!course?.id && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-red-800">
              Please save the course information first before adding lectures.
            </p>
          </CardContent>
        </Card>
      )}

      <ScrollArea className="h-[600px] w-full max-w-full overflow-x-hidden md:pr-4">
        <div className="space-y-4">
          {allLectures?.map((lecture) => (
            <LectureItem key={lecture.id} lecture={lecture} />
          ))}

          {allLectures?.length === 0 && course.id && (
            <Card>
              <CardContent className="text-center py-12">
                <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No lectures yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by creating your first lecture
                </p>
                <Button
                  onClick={handleAddLecture}
                  disabled={addLecture.isPending}
                >
                  {addLecture.isPending ? (
                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Create First Lecture
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
