"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import { Label } from "../ui/label";
import { useCreateVocabulary } from "@/queries/vocabulary";

export default function VocabModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const addVocabs = useCreateVocabulary();

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("title is required");
      return;
    }

    addVocabs.mutate(title, {
      onSuccess: () => {
        toast.success("Vocabulary created successfully");
        onClose();
      },
    });
  };

  const handleCloseModal = () => {
    onClose();
    setTitle("");
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{"Create Quiz Section"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-4">
            <Label>Vocabulary Title</Label>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={addVocabs.isPending} onClick={handleSubmit}>
            {addVocabs.isPending ? "Loading" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
