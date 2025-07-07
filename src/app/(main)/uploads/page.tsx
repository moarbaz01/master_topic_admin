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
import { Search, Edit, Trash, View, File, RefreshCw } from "lucide-react";
import CreateTagModal from "@/components/create-tag-modal";
import CloudinaryUpload from "@/components/cloudinary-widget";
import { getThumbnailUrl } from "@/utils/thumbGenerater";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UpdateMediaModal from "@/components/modals/update-media-modal";
import toast from "react-hot-toast";
import TransparentLoader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useTags } from "@/queries/tags";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaginationControl from "@/components/pagination-control";

export default function MediaLibrary() {
  const [searchName, setSearchName] = useState("");
  const [showTagModal, setShowTagModal] = useState(false);

  const { data: tags } = useTags();
  const deleteMedia = useDeleteMedia();
  const [isEditMedia, setIsEditMedia] = useState(false);
  const [editedMedia, setEditedMedia] = useState<any>(null);
  const [typeFilter, setTypeFilter] = useState("none");
  const [tagFilter, setTagFilter] = useState("none");
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useMedia({
    page,
    limit,
    type: typeFilter, // "image" | "video"
    name: searchName ?? undefined, // by name or tag
    tag: tagFilter,
  });
  const mediaItems = data?.data;
  console.log("media Items", mediaItems);
  const total = data?.count || 0;

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

  const clearFilters = () => {
    setSearchName("");
    setTypeFilter("none");
    setTagFilter("none");
    setPage(1);
  };

  const activeFiltersCount = [
    searchName,
    typeFilter !== "none" ? typeFilter : null,
    tagFilter !== "none" ? tagFilter : null,
  ].filter(Boolean).length;

  return (
    <div className=" space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Media</h1>
          <p className="text-muted-foreground mt-2">
            Upload images and videos to use in your quizzes, questions, and
            answers. You can also add tags to organize your media.
          </p>
        </div>
        <div className="flex gap-2">
          <CloudinaryUpload />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {/* Search Bar */}
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search media by title..."
            className="pl-10"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <Select onValueChange={(e) => setTypeFilter(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">All</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(e) => setTagFilter(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Select Tag</SelectItem>
            {tags?.map((item) => (
              <SelectItem key={item.name} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        )}
      </div>

      {/* Main Media Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>View</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Size</TableHead>
              {/* <TableHead>Tags</TableHead> */}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                    Loading media's...
                  </div>
                </TableCell>
              </TableRow>
            ) : mediaItems?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <File className="w-8 h-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No media found</p>
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      Clear filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              mediaItems?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <Image
                      alt={item.name}
                      src={getThumbnailUrl(item.url, item.format)}
                      height={50}
                      width={50}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-medium">
                    <a className="text-primary" target="_blank" href={item.url}>
                      Live View
                    </a>
                  </TableCell>
                  <TableCell className="capitalize">{item.type}</TableCell>
                  <TableCell>
                    {item?.tags && item.tags.length > 0 ? (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="link">View Tags</Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="flex flex-wrap gap-2">
                            {(item.tags as string[]).map((tag) => (
                              <Badge variant="outline" key={tag}>
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ) : (
                      <span className="text-muted-foreground text-sm">N/A</span>
                    )}
                  </TableCell>

                  <TableCell>{item?.format}</TableCell>
                  <TableCell>
                    {(item.size / 1024 / 1024).toFixed(2)} MB
                  </TableCell>

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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationControl
        limit={limit}
        page={page}
        total={total}
        onPageChange={(page) => setPage(page)}
      />

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
