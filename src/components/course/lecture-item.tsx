"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Save,
  RefreshCw,
  Trash2,
  GripVertical,
  Lock,
  Unlock,
  ChevronDown,
  ChevronRight,
  Clock,
  Check,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CreateLectureType, LectureType } from "@/types/course";
import { formatDuration } from "@/utils/format-duration";
import { useDeleteLecture, useUpdateLecture } from "@/queries/lecture";
import { MediaSelectInput } from "../media-select";
import { Textarea } from "../ui/textarea";
import { isEqual } from "lodash";

interface LectureItemProps {
  lecture: LectureType;
}

export default function LectureItem({ lecture }: LectureItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lectureData, setLectureData] = useState(lecture ?? {});

  const handleChange = (key: string, value: string | boolean) => {
    setLectureData((prev) => ({ ...prev, [key]: value }));
  };

  const initialDataRef = useRef<CreateLectureType>(lecture);
  const hasChanges = !isEqual(lectureData, initialDataRef.current);

  const updateLecture = useUpdateLecture();
  const deleteLecture = useDeleteLecture();
  const handleSave = () => {
    const { id, ...other } = lectureData;
    updateLecture.mutate({ id: lecture.id, data: other });
  };

  return (
    <Card className="w-full max-w-full overflow-hidden">
      <CardHeader className="pb-3 w-full overflow-hidden">
        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center w-full max-w-full overflow-x-auto">
          <div className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-3 w-full overflow-hidden">
            {/* Drag + Lesson Number */}
            <div className="flex items-center gap-2">
              {/* Collapsible toggle */}
              <Collapsible>
                <CollapsibleTrigger
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 hover:bg-muted p-1 rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </CollapsibleTrigger>
              </Collapsible>
              <Input
                value={lectureData.lesson_number || ""}
                onChange={(e) => handleChange("lesson_number", e.target.value)}
                placeholder="L No."
                className="w-[60px]"
              />
            </div>

            {/* Lecture Title */}
            <div className=" w-full md:w-auto">
              <Input
                value={lectureData.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Lecture title"
                className="w-full"
              />
            </div>

            {/* Duration, Lock, Status */}
            <div className="flex flex-wrap items-center gap-2">
              {lectureData.is_locked ? (
                <Lock className="w-4 h-4 text-red-500" />
              ) : (
                <Unlock className="w-4 h-4 text-green-500" />
              )}
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDuration(lectureData.duration || 0)}
              </Badge>
              {!hasChanges && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Saved
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleSave}
                disabled={updateLecture.isPending || !hasChanges}
                size="sm"
              >
                {updateLecture.isPending ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteLecture.mutate(lecture?.id)}
                disabled={deleteLecture.isPending}
                className="text-destructive hover:text-destructive bg-transparent"
              >
                {deleteLecture.isPending ? (
                  <RefreshCw className="w-3 h-3 animate-spin" />
                ) : (
                  <Trash2 className="w-3 h-3" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <Collapsible open={isExpanded}>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration (minutes)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={lectureData.duration || ""}
                  onChange={(e) => handleChange("duration", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Access Control</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    checked={!lectureData.is_locked}
                    onCheckedChange={(checked) =>
                      handleChange("is_locked", !checked)
                    }
                  />
                  <Label>{lectureData.is_locked ? "Locked" : "Unlocked"}</Label>
                </div>
              </div>
            </div>

            <div className="w-full">
              <MediaSelectInput
                variant="card"
                label="Select Lecture Video"
                value={lectureData.video_url}
                onChange={(e) => handleChange("video_url", e)}
              />
            </div>

            <div className="space-y-2">
              <Label>Description ( Optional )</Label>
              <Textarea
                placeholder="Description"
                value={lectureData.description ?? ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            {hasChanges && (
              <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-sm text-amber-800">
                  You have unsaved changes
                </span>
                <Button
                  onClick={handleSave}
                  disabled={updateLecture.isPending}
                  size="sm"
                  className="ml-auto"
                >
                  {updateLecture.isPending ? (
                    <RefreshCw className="w-4 h-4 animate-spin mr-1" />
                  ) : (
                    <Save className="w-4 h-4 mr-1" />
                  )}
                  Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
