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
import { useTags } from "@/queries/tags";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { MediaType } from "@/services/media";

interface UpdateMediaModalProps {
  open: boolean;
  onClose: () => void;
  media: MediaType;
}

export default function UpdateMediaModal({
  open,
  onClose,
  media,
}: UpdateMediaModalProps) {
  const [mediaName, setMediaName] = useState(media?.name);
  const { data: tags } = useTags();
  const updateMedia = useUpdateMedia();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleUpdate = () => {
    if (!mediaName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    updateMedia.mutate(
      {
        id: media?.id ?? "",
        data: {
          name: mediaName,
          tags: selectedTags, // 👈 send tags here
        },
      },
      {
        onSuccess: () => {
          toast.success("Media updated successfully");
          onClose();
        },
        onError: (err: any) => {},
      }
    );
  };

  useEffect(() => {
    if (open) {
      setMediaName(media?.name);
      setSelectedTags(media?.tags || []);
    }
  }, [open, media?.name, media?.tags]);

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

        <div className="space-y-2">
          <label className="text-sm font-medium">Tags</label>

          {/* Selected Tags */}
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="flex items-center gap-1 pr-1"
              >
                {tag}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setSelectedTags((prev) => prev.filter((t) => t !== tag))
                  }
                  className="h-4 w-4 text-destructive hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>

          {/* Selectable Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags
              ?.filter((tag) => !selectedTags.includes(tag.name))
              .map((tag) => (
                <Button
                  key={tag.id}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTags((prev) => [...prev, tag.name])}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" />
                  {tag.name}
                </Button>
              ))}
          </div>
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
