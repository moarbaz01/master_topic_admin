"use client";

import CreateTagModal from "@/components/create-tag-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        <div className="flex gap-2">
          <Button onClick={handleCreateTag}>
            <Plus className="mr-2 h-4 w-4" /> Create Tag
          </Button>
        </div>
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

      {/* Tags Table */}
      {isLoading ? (
        <TagTableSkeleton />
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[160px]">ID</TableHead>
                <TableHead className="w-[120px]">Name</TableHead>
                <TableHead className="w-[80px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tags
                ?.filter((item) =>
                  item.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-right space-x-4">
                      <Button onClick={() => handleEditTag(item)} size="icon">
                        <Edit />
                      </Button>
                      <Button
                        onClick={() => deleteTag.mutate(item.id)}
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
      )}

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
