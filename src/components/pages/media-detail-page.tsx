"use client";

import { useGetMediaById } from "@/queries/media";
import { Loader2, FileText } from "lucide-react";
import Image from "next/image";
import PDF from "react-pdf-js";

export default function MediaDetailPage({ id }: { id: string }) {
  const { data: media, isLoading, isError } = useGetMediaById(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
      </div>
    );
  }

  if (isError || !media) {
    return (
      <div className="text-center text-destructive text-sm mt-6">
        Failed to load media. Please try again later.
      </div>
    );
  }

  // Better type detection using both type and format
  const audioFormats = ["mp3", "aac", "m4a", "wav", "ogg", "flac"];
  const videoFormats = ["mp4", "mov", "avi", "webm", "mkv"];

  const isImage = media.type === "image" && media.format !== "pdf";
  const isAudio = media.type === "video" && audioFormats.includes(media.format);
  const isVideo = media.type === "video" && videoFormats.includes(media.format);
  const isPDF =
    (media.type === "image" && media.format === "pdf") ||
    (media.type === "raw" && media.format === "pdf");

  const isUnsupported = !isImage && !isVideo && !isAudio && !isPDF;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">{media.name}</h1>

      <div className="border rounded-lg p-4 bg-muted">
        {isVideo && (
          <video
            controls
            className="w-full max-h-[500px] rounded object-contain"
          >
            <source src={media.url} type={`video/${media.format}`} />
            Your browser does not support the video tag.
          </video>
        )}

        {isAudio && (
          <audio controls className="w-full">
            <source src={media.url} type={`audio/${media.format}`} />
            Your browser does not support the audio tag.
          </audio>
        )}

        {isImage && (
          <div className="relative overflow-hidden rounded max-w-full max-h-[500px]">
            <Image
              src={media.url}
              alt={media.name}
              width={media.width}
              height={media.height}
              className="w-full h-full object-contain blur-sm transition-all duration-500 ease-out"
              onLoad={(e) => e.currentTarget.classList.remove("blur-sm")}
            />
          </div>
        )}
        {isPDF && (
          <div className="flex flex-col items-center justify-center py-6 space-y-3 text-center">
            <p className="text-muted-foreground text-sm">
              PDF preview is disabled. You can download the file below.
            </p>
            <a
              href={media.url.replace("/upload/", "/upload/fl_attachment/")}
              download={media.name}
              className="px-4 py-2 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 transition"
            >
              Download PDF
            </a>
          </div>
        )}

        {isUnsupported && (
          <div className="flex flex-col items-center justify-center space-y-2 py-8 text-center text-sm text-muted-foreground">
            <FileText className="w-10 h-10 text-orange-500" />
            <p>
              Preview not available for this file type (
              <strong>.{media.format}</strong>)
            </p>
            <a
              href={media.url}
              download
              className="text-primary font-medium underline"
            >
              Download File
            </a>
          </div>
        )}
      </div>

      <div className="text-sm text-muted-foreground space-y-1">
        <p>
          <strong>Type:</strong> {media.type}
        </p>
        <p>
          <strong>Format:</strong> {media.format}
        </p>
        <p>
          <strong>Size:</strong> {(media.size / (1024 * 1024)).toFixed(2)} MB
        </p>
        <p>
          <strong>Public ID:</strong> {media.publicId}
        </p>
      </div>
    </div>
  );
}
