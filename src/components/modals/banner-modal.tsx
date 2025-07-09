"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, RefreshCw, Save } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCreateBanner, useUpdateBanner } from "@/queries/banner";
import { MediaSelectInput } from "../media-select";
import { BannerType } from "@/types/banner";
import toast from "react-hot-toast";
import { isEqual } from "lodash";

interface BannerFormProps {
  banner?: BannerType | null;
  banners?: BannerType[];
  onClose: () => void;
}

export default function BannerForm({
  banner,
  banners,
  onClose,
}: BannerFormProps) {
  const isEditing = !!banner;
  const createBanner = useCreateBanner();
  const updateBanner = useUpdateBanner();
  const position = banners?.length ? banners.length + 1 : 1;
  const initialData = useMemo(() => {
    return {
      title: "",
      image_url: "",
      position,
    };
  }, [position]);

  const [bannerData, setBannerData] = useState(initialData);

  const initialDataRef = useRef<Omit<BannerType, "id">>(initialData);
  const hasChanges = !isEqual(bannerData, initialDataRef.current);

  const handleChange = (key: string, value: string) => {
    setBannerData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    if (!bannerData.title || !bannerData.image_url) {
      toast.error("Banner title and image are required");
      return;
    }

    if (banner?.id) {
      updateBanner.mutate(
        {
          id: banner?.id ?? "",
          updates: {
            title: bannerData.title,
            image_url: bannerData.image_url,
            position: bannerData.position,
          },
        },
        {
          onSuccess: () => {
            toast.success("Banner Updated");
            onClose();
          },
          onError: (err) => {
            toast.error(err.message);
          },
        }
      );
    } else {
      createBanner.mutate(bannerData, {
        onSuccess: () => {
          toast.success("Banner Created");
          onClose();
        },
        onError: (err) => {
          toast.error(err.message);
        },
      });
    }
  };

  useEffect(() => {
    if (banner?.id) {
      const newData = {
        title: banner?.title,
        image_url: banner?.image_url ?? "",
        position: banner?.position ?? position,
      };
      setBannerData(newData);
      initialDataRef.current = newData;
    }
  }, [banner]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          {isEditing ? "Edit Banner" : "Add New Banner"}
        </CardTitle>
        {onClose && (
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Postion */}
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input
            id="title"
            name="position"
            placeholder="Enter banner title..."
            type="number"
            value={bannerData?.position < 0 ? 0 : bannerData.position}
            onChange={(e) => handleChange("position", e.target.value)}
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Banner Title *</Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter banner title..."
            type="text"
            value={bannerData?.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <MediaSelectInput
            value={bannerData?.image_url}
            label="Banner Image"
            onChange={(e) => handleChange("image_url", e)}
          />
        </div>

        {/* Help Text */}
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
          <p className="font-medium mb-1">Requirements:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Banner title is required</li>
            <li>At least one media URL (image) is required</li>
            <li>URLs should be publicly accessible</li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className=" text-end ">
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="w-fit "
          >
            {createBanner.isPending || updateBanner.isPending ? (
              <RefreshCw className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isEditing ? "Update Banner" : "Create Banner"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
