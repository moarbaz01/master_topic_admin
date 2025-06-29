"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMedia } from "@/queries/media";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { MediaPreview } from "../media-preview";
import UploadMediaModal from "../cloudinary-widget";

export function MediaPickerModal({
  open,
  onClose,
  onSelect,
  filterFormat,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  filterFormat?: string;
}) {
  const { data = [], isLoading } = useMedia();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return data.filter((m) => {
      const searchMatch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.tags?.some((t: string) =>
          t.toLowerCase().includes(search.toLowerCase())
        );
      const formatMatch = filterFormat ? m.format === filterFormat : true;
      return searchMatch && formatMatch;
    });
  }, [data, search, filterFormat]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
        </DialogHeader>

        <div>
          <Input
            placeholder="Search by name or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />
          <UploadMediaModal />
        </div>

        <div className=" space-y-4 overflow-y-auto max-h-[60vh] p-1">
          {filtered.length === 0 && !isLoading && (
            <p className="col-span-full text-sm text-muted-foreground">
              No media found.
            </p>
          )}
          {filtered.map((media) => (
            <div
              key={media.id}
              onClick={() => onSelect(media.url)}
              className="cursor-pointer border rounded p-2 space-y-2 hover:border-primary group"
            >
              <MediaPreview url={media.url} small />
              <p className="text-xs truncate ">{media.name}</p>
              <p className="text-[10px] text-muted-foreground">
                {media.format}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
