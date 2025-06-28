"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { UploadCloud} from "lucide-react";
import { toast } from "react-hot-toast";
import { useAddMedia } from "@/queries/media";
import type { MediaType } from "@/services/media";

export default function UploadMediaModal() {
  const addMedia = useAddMedia();

  const handleUpload = (result: any) => {
    if (!result?.info) return;

    const info = result.info;

    const file: MediaType = {
      name: info.original_filename,
      type: info.resource_type,
      url: info.secure_url,
      publicId: info.public_id,
      size: info.bytes,
      format: info.format,
      duration: info.duration,
      width: info.width,
      height: info.height,
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
        options={{ multiple: true }}
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
