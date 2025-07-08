"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAddMedia } from "@/queries/media";
import { MediaType } from "@/types/media";
import { useState } from "react";

export default function UploadMediaModal({
  onWidgetOpenChange,
}: {
  onWidgetOpenChange?: (open: boolean) => void;
}) {
  const addMedia = useAddMedia();
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  const handleUpload = (result: any) => {
    if (!result?.info) return;

    const info = result.info;

    const file: Omit<MediaType, "id"> = {
      name: info.original_filename,
      type: info.resource_type,
      url: info.secure_url,
      publicId: info.public_id,
      size: info.bytes,
      format: info.format,
      duration: info.duration,
      width: info.width,
      height: info.height,
      tags: [],
    };

    addMedia.mutate(file, {
      onSuccess: () => {
        toast.success("Media uploaded successfully");
      },
      onError: (error) => {
        toast.error("Failed to upload media");
        console.error(error);
      },
    });
  };

  return (
    <div className="space-y-4">
      <CldUploadWidget
        uploadPreset="master-topic"
        signatureEndpoint="/api/cloudinary-signature"
        onOpen={() => {
          setIsWidgetOpen(true);
          onWidgetOpenChange?.(true);
        }}
        onClose={() => {
          setIsWidgetOpen(false);
          onWidgetOpenChange?.(false);
        }}
        onSuccess={handleUpload}
        options={{
          multiple: true,
          sources: ["local"],
          clientAllowedFormats: [
            "jpg",
            "jpeg",
            "png",
            "webp",
            "gif",
            "mp4",
            "mov",
            "avi",
            "webm",
            "pdf",
            "docx",
            "xlsx",
            "pptx",
          ],
          resourceType: "auto",
          styles: {
            palette: {
              window: "#ffffff",
              sourceBg: "#ffffff",
              windowBorder: "#cc5500",
              tabIcon: "#cc5500",
              inactiveTabIcon: "#999999",
              menuIcons: "#cc5500",
              link: "#cc5500",
              action: "#cc5500",
              inProgress: "#cc5500",
              complete: "#228B22",
              error: "#FF0000",
              textDark: "#000000",
              textLight: "#ffffff",
            },
            frame: {
              background: "rgba(0,0,0,0.5)",
              border: "none",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              zIndex: 9999,
            },
          },
        }}
      >
        {({ open }) => (
          <Button onClick={() => open()}>
            <UploadCloud className="w-4 h-4 mr-2" />
            Upload Media
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
}
