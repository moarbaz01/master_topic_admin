"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoTab from "@/components/vocabs/basic-info-tab";
import { VocabSectionTab } from "@/components/vocabs/vocab-section-tab";
import { useVocabularyById } from "@/queries/vocabulary";
import { useState } from "react";
import { PreviewTab } from "../vocabs/preview-tab";

const Vocabulary = ({ id }: { id: string }) => {
  const { data: vocabularyData, isLoading } = useVocabularyById(id as string);
  const [activeTab, setActiveTab] = useState("basic");

  if (isLoading || !vocabularyData) {
    return <div className="p-4">Loading vocabulary...</div>;
  }

  return (
    <div className=" max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {isLoading ? "Loading..." : vocabularyData?.title || "Untitled"}
        </h1>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="sections">Sections & Words</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <BasicInfoTab vocabularyData={vocabularyData} />
        <VocabSectionTab vocabulary={vocabularyData} />
        <PreviewTab vocabulary={vocabularyData} />
      </Tabs>
    </div>
  );
};

export default Vocabulary;
