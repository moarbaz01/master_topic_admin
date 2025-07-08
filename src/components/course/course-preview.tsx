"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Star, Lock, Unlock } from "lucide-react";
import { CourseType, LectureType } from "@/types/course";
import { useLecturesByCourseId } from "@/queries/lecture";
import { formatDuration } from "@/utils/format-duration";

interface CoursePreviewProps {
  course: Partial<CourseType>;
}

export default function CoursePreview({ course }: CoursePreviewProps) {
  const { data: lectures } = useLecturesByCourseId(course?.id ?? "");

  const getTotalDuration = () => {
    return (
      lectures?.reduce(
        (total, lecture) => total + (lecture.duration || 0),
        0
      ) ?? 0
    );
  };

  const getUnlockedLecturesCount = () => {
    return lectures?.filter((lecture) => !lecture.is_locked).length;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Course Preview
          </CardTitle>
          <CardDescription>
            Review your course before publishing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Course Header */}
          <div className="flex items-start gap-4">
            <div
              className="w-24 h-16 rounded-lg flex items-center justify-center"
              style={{
                background: course.thumbnail_color
                  ? `linear-gradient(135deg, ${course.thumbnail_color[0]}, ${course.thumbnail_color[1]})`
                  : "linear-gradient(135deg, #3B82F6, #1E40AF)",
              }}
            >
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {course.title || "Untitled Course"}
              </h2>
              <p className="text-muted-foreground mt-1">
                {course.description || "No description provided"}
              </p>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {course.level && (
                  <Badge variant="outline">{course.level}</Badge>
                )}
                {course.category && (
                  <Badge variant="outline">{course.category}</Badge>
                )}
                {course.is_new && (
                  <Badge className="bg-green-100 text-green-800">New</Badge>
                )}
                {course.is_paid ? (
                  <Badge className="bg-blue-100 text-blue-800">Paid</Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-800">Free</Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Course Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{lectures?.length}</div>
                <p className="text-sm text-muted-foreground">Lectures</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {formatDuration(getTotalDuration())}
                </div>
                <p className="text-sm text-muted-foreground">Duration</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  {(course.rating || 0).toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Rating</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">${course.price || 0}</div>
                <p className="text-sm text-muted-foreground">
                  {course.original_price &&
                    course.original_price > (course.price || 0) && (
                      <span className="line-through text-muted-foreground mr-1">
                        ${course.original_price}
                      </span>
                    )}
                  Price
                </p>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Course Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Free Lectures:</span>
                  <span>
                    {getUnlockedLecturesCount()} of {lectures?.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Course Type:</span>
                  <Badge variant={course.is_paid ? "default" : "secondary"}>
                    {course.is_paid ? "Paid Course" : "Free Course"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pricing Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Original Price:</span>
                  <span>${course.original_price || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Current Price:</span>
                  <span className="font-semibold">${course.price || 0}</span>
                </div>
                {/* {course.original_price &&
                  course.original_price > (course.price || 0) && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Discount:</span>
                      <Badge variant="destructive">
                        {Math.round(
                          ((course.original_price - (course.price || 0)) /
                            course.original_price) *
                            100
                        )}
                        % OFF
                      </Badge>
                    </div>
                  )} */}
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Lectures List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Course Content</h3>
            {lectures && lectures?.length > 0 ? (
              <div className="space-y-2">
                {lectures?.map((lecture, index) => (
                  <div
                    key={lecture.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">#{lecture.lesson_number}</Badge>
                      <div>
                        <h4 className="font-medium">
                          {lecture.title || `Lecture ${index + 1}`}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {formatDuration(lecture.duration || 0)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {lecture.is_locked ? (
                        <Badge
                          variant="destructive"
                          className="flex items-center gap-1"
                        >
                          <Lock className="w-3 h-3" />
                          Locked
                        </Badge>
                      ) : (
                        <Badge
                          variant="default"
                          className="flex items-center gap-1 bg-green-100 text-green-800"
                        >
                          <Unlock className="w-3 h-3" />
                          Free
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No lectures added yet
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
