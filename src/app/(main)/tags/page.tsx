"use client";

import CreateTagModal from "@/components/create-tag-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, Plus, Search, Trash } from "lucide-react";
import React, { useState } from "react";
import { useDeleteTag, useTags } from "@/queries/tags";
import { TagTableSkeleton } from "@/components/skeletons/tags";

const Tags = () => {
  const [showTagModal, setShowTagModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const { data: tags, isLoading } = useTags();
  const deleteTag = useDeleteTag();

  const handleEditTag = (tag: { id: string; name: string }) => {
    setSelectedTag(tag);
    setIsEdit(true);
    setShowTagModal(true);
  };

  const handleCreateTag = () => {
    setSelectedTag(null);
    setIsEdit(false);
    setShowTagModal(true);
  };

  const handleCloseModal = () => {
    setShowTagModal(false);
    setSelectedTag(null);
    setIsEdit(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tags</h1>
        <Button onClick={handleCreateTag}>
          <Plus className="mr-2 h-4 w-4" /> Create Tag
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tags by name..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tags
          ?.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((tag) => (
            <Card className="bg-white" key={tag.id}>
              <CardHeader>
                <CardTitle className="text-lg">{tag.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                ID: {tag.id}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  onClick={() => handleEditTag(tag)}
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
          ))}
      </div>

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
