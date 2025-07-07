"use client";

import { Button } from "@/components/ui/button";
import { MediaPreview } from "./media-preview";
import { useState } from "react";
import { MediaPickerModal } from "./modals/media-picker-modal";

export function MediaSelectInput({
  label,
  title = "Select Media",
  value,
  icon,
  onChange,
  filterFormat,
}: {
  label?: string;
  title?: string;
  icon?: React.ReactNode;
  value?: string;
  onChange: (url: string) => void;
  filterFormat?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium">{label}</p>}

      <div className="flex items-center  gap-4">
        {value && <MediaPreview url={value} small />}
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          {icon && icon}
          {value ? "Change Media" : title}
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
