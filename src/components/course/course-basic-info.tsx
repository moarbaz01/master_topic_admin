"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Save, RefreshCw, Check } from "lucide-react";

import { toast } from "react-hot-toast";
import { CourseType, CreateCourseType } from "@/types/course";
import { courseLevels, courseStatus, thumbnailColors } from "../../../data";
import { useAddCourse, useUpdateCourse } from "@/queries/course";
import Loader from "../ui/loader";
import isEqual from "lodash/isEqual";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface CourseBasicInfoProps {
  course?: CourseType;
}

const defaultData: CreateCourseType = {
  title: "",
  duration: 0,
  level: "beginner",
  original_price: 0,
  price: 0,
  is_paid: false,
  is_new: false,
  thumbnail_color: ["#3B82F6", "#1E40AF"],
  description: "",
  status: "draft",
};

export default function CourseBasicInfo({ course }: CourseBasicInfoProps) {
  const [courseData, setCourseData] = useState<CreateCourseType>(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const initialDataRef = useRef<CreateCourseType>(defaultData);
  const hasChanges = !isEqual(courseData, initialDataRef.current);

  const addCourse = useAddCourse();
  const updateCourse = useUpdateCourse();

  // Handlers
  const handleChange = (key: keyof CreateCourseType, value: any) => {
    setCourseData((prev) => ({ ...prev, [key]: value }));
  };

  const onSuccess = (data: CourseType) => {
    toast.success("Course saved successfully");
    router.push(`/courses/${data.id}`);
  };
  const onError = () => toast.error("Failed to save course");

  const handleSave = () => {
    if (!courseData.title.trim()) {
      toast("Title field is required");
      return;
    }

    if (course?.id) {
      updateCourse.mutate(
        { id: course.id, data: courseData as CourseType },
        { onSuccess, onError }
      );
    } else {
      addCourse.mutate(courseData, { onSuccess, onError });
    }
  };

  useEffect(() => {
    if (course) {
      const newData = {
        title: course.title,
        duration: course.duration ?? 0,
        level: course.level ?? "beginner",
        original_price: course.original_price ?? 0,
        price: course.price ?? 0,
        is_paid: course.is_paid ?? false,
        is_new: course.is_new ?? false,
        thumbnail_color: course.thumbnail_color ?? ["", ""],
        description: course.description ?? "",
        status: course.status ?? "draft",
      };

      setCourseData(newData);
      initialDataRef.current = newData;
    }
    setIsLoading(false);
  }, [course]);

  return (
    <div className="space-y-6">
      {isLoading ? (
        <Loader label="Loading Course Information" />
      ) : (
        <Card>
          <CardHeader>
            <div className="flex md:items-center gap-4 md:flex-row flex-col justify-between">
              <div>
                <CardTitle>Course Information</CardTitle>
                <CardDescription>
                  Set up the basic details for your course
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {course?.id && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Check className="w-3 h-3" /> Saved
                  </Badge>
                )}
                <Button
                  onClick={handleSave}
                  disabled={
                    addCourse.isPending ||
                    updateCourse.isPending ||
                    !courseData.title.trim() ||
                    !hasChanges
                  }
                >
                  {addCourse.isPending || updateCourse.isPending ? (
                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Course
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Title & Level */}
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <Label htmlFor="course-title">Course Title *</Label>
                <Input
                  id="course-title"
                  placeholder="Enter course title"
                  value={courseData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course-level">Level</Label>
                <Select
                  value={courseData.level}
                  onValueChange={(value) => handleChange("level", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseLevels.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-level">Status</Label>
                <Select
                  value={courseData.status}
                  onValueChange={(value) => handleChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseStatus.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="original-price">Original Price ($)</Label>
                <Input
                  id="original-price"
                  type="number"
                  value={courseData.original_price ?? 0}
                  onChange={(e) =>
                    handleChange("original_price", e.target.value)
                  }
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-price">Current Price ($)</Label>
                <Input
                  id="current-price"
                  type="number"
                  value={courseData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Course Type</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    checked={courseData.is_paid}
                    onCheckedChange={(checked) =>
                      handleChange("is_paid", checked)
                    }
                  />
                  <Label>
                    {courseData.is_paid ? "Paid Course" : "Free Course"}
                  </Label>
                </div>
              </div>
            </div>

            {/* Thumbnail Colors */}
            <div className="space-y-2">
              <Label>Thumbnail Color</Label>
              <div className="grid grid-cols-6 gap-2">
                {thumbnailColors.map((colors, i) => (
                  <button
                    key={i}
                    onClick={() => handleChange("thumbnail_color", colors)}
                    className={`h-12 rounded-lg border-2 transition-all ${
                      JSON.stringify(courseData.thumbnail_color) ===
                      JSON.stringify(colors)
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-muted hover:border-primary/50"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Flags */}
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={courseData.is_new}
                  onCheckedChange={(checked) => handleChange("is_new", checked)}
                />
                <Label>Mark as New</Label>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="course-description">Description</Label>
              <Textarea
                id="course-description"
                value={courseData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter course description"
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
