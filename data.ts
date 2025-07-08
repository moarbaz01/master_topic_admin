import { File, FileAudio, ImageIcon, Video } from "lucide-react";

export const mediaTypes = {
  image: {
    icon: ImageIcon,
    label: "Image",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    formats: ["jpg", "jpeg", "png", "gif", "webp", "svg"],
  },
  video: {
    icon: Video,
    label: "Video",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    formats: ["mp4", "avi", "mov", "wmv", "flv", "webm"],
  },
  audio: {
    icon: FileAudio,
    label: "Audio",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    formats: ["mp3", "wav", "ogg", "m4a", "flac"],
  },
  document: {
    icon: File,
    label: "Document",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    formats: ["pdf", "doc", "docx", "txt", "rtf"],
  },
};

export const thumbnailColors = [
  ["#3B82F6", "#1E40AF"], // Blue gradient
  ["#10B981", "#047857"], // Green gradient
  ["#F59E0B", "#D97706"], // Yellow gradient
  ["#EF4444", "#DC2626"], // Red gradient
  ["#8B5CF6", "#7C3AED"], // Purple gradient
  ["#EC4899", "#DB2777"], // Pink gradient
];

export const courseLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];
