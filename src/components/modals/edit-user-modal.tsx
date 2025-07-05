"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UpdateUserType, UserType } from "@/types/user";
import { useEffect, useState } from "react";
import { useUpdateUser } from "@/queries/user";
import { Label } from "../ui/label";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: UserType;
}

export default function EditUserModal({
  open,
  onClose,
  user,
}: EditUserModalProps) {
  const [form, setForm] = useState<UpdateUserType>({
    name: "",
    phone: "",
    gender: "",
    role: "user",
    subscription: "basic",
  });
  const updateUser = useUpdateUser();

  console.log(user);

  const handleSave = () => {
    updateUser.mutate({ id: user?.id, data: form });
    onClose();
  };

  const handleChange = (key: keyof UpdateUserType, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        phone: user.phone,
        gender: user.gender,
        role: user.role,
        subscription: user.subscription,
      });
    }
  }, [user]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="space-y-2">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <div>
          <Label className="block text-sm font-medium mb-1">Name</Label>
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-1">Phone</Label>
          <Input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        <div className="flex flex-wrap space-x-4">
          <div>
            <Label className="block text-sm font-medium mb-1">Gender</Label>
            <Select
              value={form.gender}
              onValueChange={(value) => handleChange("gender", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="block text-sm font-medium mb-1">Role</Label>
            <Select
              value={form.role}
              onValueChange={(value) => handleChange("role", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="block text-sm font-medium mb-1">
              Subscription Plan
            </Label>
            <Select
              value={form.subscription}
              onValueChange={(value) => handleChange("subscription", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select subscription" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={updateUser.isPending}>
            {updateUser.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
