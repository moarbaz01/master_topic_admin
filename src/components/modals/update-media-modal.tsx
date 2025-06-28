"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useUpdateMedia } from "@/queries/media";

interface UpdateMediaModalProps {
  open: boolean;
  onClose: () => void;
  media: {
    id: string;
    name: string;
    type: string;
    url: string;
    size: number;
    publicId: string;
    format?: string;
    width?: number;
    height?: number;
    duration?: number;
  };
}

export default function UpdateMediaModal({
  open,
  onClose,
  media,
}: UpdateMediaModalProps) {
  const [mediaName, setMediaName] = useState(media?.name);
  const updateMedia = useUpdateMedia();

  const handleUpdate = () => {
    if (!mediaName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    updateMedia.mutate(
      {
        id: media?.id,
        data: {
          name: mediaName,
        },
      },
      {
        onSuccess: () => {
          toast.success("Media updated successfully");
          onClose();
        },
        onError: (err: any) => {
          toast.error(err.message || "Failed to update");
        },
      }
    );
  };

  useEffect(() => {
    if (open) setMediaName(media?.name); // Reset state on modal open
  }, [open, media?.name]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Media</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={mediaName}
            onChange={(e) => setMediaName(e.target.value)}
            placeholder="Media title"
          />
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={updateMedia.isPending}>
            {updateMedia.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
