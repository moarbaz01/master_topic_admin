"use client";

import { useGetMediaById } from "@/queries/media";
import { Loader2 } from "lucide-react";
import Image from "next/image";

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

  const isVideo = media.type === "video";
  const isAudio = media.type === "audio";
  const isImage = media.type === "image";
  const isPDF = media.type === "raw" || media.format === "pdf";

  return (
    <div className="space-y-6 w-fit">
      <h1 className="text-2xl font-bold">{media.name}</h1>

      <div className="border rounded p-4 bg-muted">
        {isVideo && (
          <video controls className="w-full rounded">
            <source src={media.url} type={`video/${media.format}`} />
          </video>
        )}

        {isAudio && (
          <audio controls className="w-full mt-4">
            <source src={media.url} type={`audio/${media.format}`} />
          </audio>
        )}

        {isImage && (
          <div
            className="relative overflow-hidden rounded max-w-full max-h-[500px]"
            style={{ width: media.width, height: media.height }}
          >
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
          <iframe
            src={media.url}
            className="w-full h-[600px] rounded"
            title={media.name}
          ></iframe>
        )}

        {!isVideo && !isAudio && !isImage && !isPDF && (
          <p className="text-center text-sm text-muted-foreground">
            Cannot preview this media type.
          </p>
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
