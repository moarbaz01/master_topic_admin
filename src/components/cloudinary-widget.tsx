"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAddMedia } from "@/queries/media";
import { MediaType } from "@/types/media";

export default function UploadMediaModal() {
  const addMedia = useAddMedia();

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
        options={{
          multiple: true,
          sources: ["local"], // ONLY "My Files" option
          clientAllowedFormats: [
            // Images
            "jpg",
            "jpeg",
            "png",
            "webp",
            "gif",
            // Videos
            "mp4",
            "mov",
            "avi",
            "webm",
            // Raw files
            "pdf",
            "docx",
            "xlsx",
            "pptx",
          ],
          resourceType: "auto", // auto-detect image/video/raw
          styles: {
            palette: {
              window: "#ffffff", // White background
              sourceBg: "#ffffff",
              windowBorder: "#cc5500", // Darker orange border
              tabIcon: "#cc5500", // Darker orange tab icon
              inactiveTabIcon: "#999999", // Muted gray for inactive tabs
              menuIcons: "#cc5500", // Darker orange menu icons
              link: "#cc5500", // Orange link color
              action: "#cc5500", // Action buttons
              inProgress: "#cc5500", // Upload progress
              complete: "#228B22", // Green when upload completes
              error: "#FF0000", // Red error color
              textDark: "#000000", // For white background
              textLight: "#ffffff", // For dark buttons/icons
            },
            frame: {
              background: "rgba(0,0,0,0.5)",
              border: "none",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              zIndex: 9999, // 👈 forcefully increase here
            },
          },
        }}
        onSuccess={handleUpload}
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
