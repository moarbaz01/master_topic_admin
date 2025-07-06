"use client";
import VocabularyCard from "@/components/cards/vocab-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import React, { useState } from "react";

function Vocabularies() {
  const [searchTitle, setSearchTitle] = useState("");

  const handleCreateVocab = () => {
    // Logic to create a new vocabulary
    console.log("Create new vocabulary");
  };
  return (
    <div className="space-y-6">
      {" "}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Vocabularies</h2>
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
      <div>
        <VocabularyCard id="1" title="Machinery Words" />
      </div>
    </div>
  );
}

export default Vocabularies;
