"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Edit, Plus, Search, Trash } from "lucide-react";
import { useDebounce } from "use-debounce";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import PaginationControl from "@/components/pagination-control";
import CreateTagModal from "@/components/create-tag-modal";
import { useDeleteTag, useTags } from "@/queries/tags";

const Tags = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showTagModal, setShowTagModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [debouncedSearch] = useDebounce(searchQuery, 300); // 300ms delay

  const { data, isLoading } = useTags({ name: debouncedSearch, page });
  const deleteTag = useDeleteTag();

  const tags = useMemo(() => data?.data ?? [], [data]);
  const count = useMemo(() => data?.count ?? 0, [data]);

  const handleOpenModal = useCallback((tag?: { id: string; name: string }) => {
    setSelectedTag(tag ?? null);
    setIsEdit(!!tag);
    setShowTagModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowTagModal(false);
    setSelectedTag(null);
    setIsEdit(false);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tags</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="mr-2 h-4 w-4" /> Create Tag
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tags by name..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Count */}
      <p className="text-sm text-muted-foreground">
        {count} {count === 1 ? "tag" : "tags"} found
      </p>

      {/* Tag Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <div className="flex">
            <Loader label="Loading tags..." />
          </div>
        ) : tags.length === 0 ? (
          <p className="text-muted-foreground">No tags found</p>
        ) : (
          tags.map((tag) => (
            <Card key={tag.id}>
              <CardHeader>
                <CardTitle className="text-lg">{tag.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                ID: {tag.id}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  onClick={() => handleOpenModal(tag)}
                  size="icon"
                  variant="outline"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => deleteTag.mutate(tag.id)}
                  variant="destructive"
                  size="icon"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      <PaginationControl page={page} onPageChange={setPage} total={count} />

      {/* Modal */}
      <CreateTagModal
        open={showTagModal}
        onClose={handleCloseModal}
        isEdit={isEdit}
        tag={selectedTag ?? undefined}
      />
    </div>
  );
};

export default Tags;
