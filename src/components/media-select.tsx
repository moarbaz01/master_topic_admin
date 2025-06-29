"use client";

import { Button } from "@/components/ui/button";
import { MediaPreview } from "./media-preview";
import { useState } from "react";
import { MediaPickerModal } from "./modals/media-picker-modal";

export function MediaSelectInput({
  label,
  value,
  onChange,
  filterFormat,
}: {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  filterFormat?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>

      <div className="flex items-center gap-4">
        {value ? (
          <MediaPreview url={value} small />
        ) : (
          <p className="text-muted-foreground text-sm">No media selected</p>
        )}
        <Button size="sm" onClick={() => setOpen(true)}>
          Select Media
        </Button>
      </div>

      <MediaPickerModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(url) => {
          onChange(url);
          setOpen(false);
        }}
        filterFormat={filterFormat}
      />
    </div>
  );
}
