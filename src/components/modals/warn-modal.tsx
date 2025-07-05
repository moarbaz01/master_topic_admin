"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function WarnModal({
  open,
  title,
  desc,
  onClose,
  onC,
}: {
  title: string;
  desc: string;
  open: boolean;
  onClose: () => void;
  onC: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onC}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

{
  /* Are you sure you want to logout? You will be redirected to the login
            page.
           */
}
