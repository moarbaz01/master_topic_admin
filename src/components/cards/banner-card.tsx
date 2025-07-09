"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, ImageIcon, Video, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BannerType {
  id: string;
  title: string;
  image_url?: string | null;
  video_url?: string | null;
  created_at?: string;
}

interface BannerCardProps {
  banner: BannerType;
  onEdit?: (banner: BannerType) => void;
}

export default function BannerCard({ banner, onEdit }: BannerCardProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    setIsVisible(false);

    // setTimeout(async () => {
    //   const result = await *(banner.id)
    //   if (!result.success) {
    //     setIsVisible(true)
    //     setIsDeleting(false)
    //   }
    // }, 300)
  };

  const hasImage = banner.image_url && banner.image_url.trim();
  const hasVideo = banner.video_url && banner.video_url.trim();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden pt-0 hover:shadow-md transition-shadow duration-200">
            {/* Media Preview */}
            <div className="relative h-32 bg-gray-100">
              {hasImage ? (
                <Image
                  src={banner.image_url || "/placeholder.svg"}
                  alt={banner.title}
                  fill
                  className="object-cover"
                />
              ) : hasVideo ? (
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <Video className="w-12 h-12 text-purple-500" />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}

              {/* Media type badges */}
              <div className="absolute top-2 left-2 flex gap-1">
                {hasImage && (
                  <Badge variant="secondary" className="text-xs">
                    <ImageIcon className="w-3 h-3 mr-1" />
                    Image
                  </Badge>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-base mb-2 line-clamp-2">
                {banner.title}
              </h3>

              {/* Media URLs */}
              <div className="space-y-1 mb-3">
                {hasImage && (
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <ImageIcon className="w-3 h-3" />
                    <span className="truncate">Image URL available</span>
                    <a
                      href={banner.image_url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <Button
                  onClick={() => onEdit?.(banner)}
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  size="sm"
                  className="h-8 w-8 p-0 bg-red-500 hover:bg-red-600 text-white"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
