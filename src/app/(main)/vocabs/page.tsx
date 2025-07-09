"use client";
import VocabularyCard from "@/components/cards/vocab-card";
import VocabModal from "@/components/modals/vocab-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVocabularies } from "@/queries/vocabulary";
import { Plus, Search } from "lucide-react";
import React, { useState } from "react";

function Vocabularies() {
  const [searchTitle, setSearchTitle] = useState("");
  const [openVocabModal, setOpenVocabModal] = useState(false);
  const { data: vocabulary, isLoading } = useVocabularies();

  const handleCreateVocab = () => {
    setOpenVocabModal(true);
  };
  return (
    <div className="space-y-6">
      {" "}
      <div className="flex flex-col md:flex-row  justify-between gap-4 md:items-center">
        <div className="">
          <h1 className="text-3xl font-bold">Vocabulary Management</h1>
          <p className="text-muted-foreground">
            Create and manage your vocabulary collections
          </p>
        </div>
        <Button onClick={handleCreateVocab}>
          <Plus className="mr-2 h-4 w-4" /> Create Vocab
        </Button>
      </div>
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search media by title..."
          className="pl-10"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </div>
      {/* Cards */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {vocabulary
            ?.filter((vocab) =>
              vocab.title.toLowerCase().includes(searchTitle.toLowerCase())
            )
            .map((vocab) => (
              <VocabularyCard
                key={vocab.id}
                title={vocab.title}
                id={vocab.id}
              />
            ))}
        </div>
      )}
      <VocabModal
        open={openVocabModal}
        onClose={() => setOpenVocabModal(false)}
      />
    </div>
  );
}

export default Vocabularies;
