"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2Icon } from "lucide-react";
import { useAddTag, useUpdateTag } from "@/queries/tags";

export default function CreateTagModal({
  open,
  onClose,
  isEdit = false,
  tag,
}: {
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
  tag?: {
    name: string;
    id: string;
  };
}) {
  const [tagName, setTagName] = useState("");

  const addTag = useAddTag();
  const updateTag = useUpdateTag();

  useEffect(() => {
    if (open) setTagName(tag?.name ?? "");
  }, [open, tag?.name]);

  const handleTag = () => {
    if (!tagName.trim()) {
      toast.error("Tag name is required");
      return;
    }

    if (isEdit) {
      if (tagName === tag?.name) {
        toast.error("No changes made");
        return;
      }

      updateTag.mutate(
        { id: tag?.id ?? "", name: tagName },
        {
          onSuccess: () => {
            toast.success("Tag updated successfully");
            onClose();
          },
          onError: (err) => toast.error(err.message),
        }
      );
    } else {
      addTag.mutate(tagName, {
        onSuccess: () => {
          toast.success("Tag created successfully");
          onClose();
        },
        onError: (err) => toast.error(err.message),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Tag" : "Create New Tag"}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <Input
            placeholder="Tag name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleTag}
            disabled={addTag.isPending || updateTag.isPending}
          >
            {(addTag.isPending || updateTag.isPending) && (
              <Loader2Icon className="animate-spin w-4 h-4 mr-2" />
            )}
            {isEdit ? "Save" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
