"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDeleteMedia, useMedia } from "@/queries/media"; // <-- Your media fetcher
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Edit, Trash, View } from "lucide-react";
import MediaFilters from "@/components/media-filters";
import CreateTagModal from "@/components/create-tag-modal";
import CloudinaryUpload from "@/components/cloudinary-widget";
import { getThumbnailUrl } from "@/utils/thumbGenerater";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UpdateMediaModal from "@/components/modals/update-media-modal";
import toast from "react-hot-toast";
import TransparentLoader from "@/components/loader";

export default function MediaLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showTagModal, setShowTagModal] = useState(false);
  const { data: mediaItems = [], isLoading } = useMedia();
  const deleteMedia = useDeleteMedia();
  const [isEditMedia, setIsEditMedia] = useState(false);
  const [editedMedia, setEditedMedia] = useState<any>(null);
  const router = useRouter();

  const filteredItems = mediaItems
    .sort((item) => item.createdAt)
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleUpdateMedia = (media: any) => {
    setIsEditMedia(true);
    setEditedMedia(media);
  };

  const handleCloseUpdateMediaModal = () => {
    setIsEditMedia(false);
    setEditedMedia(null);
  };

  const handleDeleteMedia = async (
    id: string,
    publicId: string,
    format: string
  ) => {
    deleteMedia.mutate(
      { id, publicId, format },
      {
        onSuccess: () => {
          toast.success(`${id} successfully deleted`);
        },
        onError: () => {
          toast.success(`${id} error deleted`);
        },
      }
    );
  };

  if (isLoading) {
    return <div className="text-muted-foreground">Loading media...</div>;
  }

  return (
    <div className=" space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Media Library</h1>
        <div className="flex gap-2">
          <CloudinaryUpload />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search media by title..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters */}
      <MediaFilters />

      {/* Main Media Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>View</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Size</TableHead>
              {/* <TableHead>Tags</TableHead> */}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <Image
                    alt={item.name}
                    src={getThumbnailUrl(item.url, item.type)}
                    height={50}
                    width={50}
                  />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="font-medium">
                  <a href={item.url}>{item.url}</a>
                </TableCell>
                <TableCell className="capitalize">{item.type}</TableCell>
                <TableCell>{item?.format}</TableCell>
                <TableCell>{(item.size / 1024 / 1024).toFixed(2)} MB</TableCell>

                <TableCell className="text-right space-x-4">
                  <Button
                    onClick={() => router.push(`/uploads/${item?.id}`)}
                    className="bg-blue-500 hover:bg-blue-300 transition text-white"
                    size="icon"
                  >
                    <View />
                  </Button>
                  <Button onClick={() => handleUpdateMedia(item)} size="icon">
                    <Edit />
                  </Button>
                  <Button
                    onClick={() =>
                      handleDeleteMedia(item.id, item.publicId, item.format)
                    }
                    className="bg-red-500 hover:bg-red-400 transition text-white"
                    size="icon"
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Tag Creation Modal */}
      <CreateTagModal
        open={showTagModal}
        onClose={() => setShowTagModal(false)}
      />

      <UpdateMediaModal
        open={isEditMedia}
        onClose={handleCloseUpdateMediaModal}
        media={editedMedia}
      />

      {deleteMedia.isPending && <TransparentLoader message="Deleting.." />}
    </div>
  );
}
