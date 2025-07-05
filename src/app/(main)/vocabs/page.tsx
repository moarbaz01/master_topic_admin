import VocabularyCard from "@/components/cards/vocab-card";
import React from "react";

function Vocabularies() {
  return (
    <div className="space-y-6">
      {" "}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Vocabularies</h2>
      </div>
      {/* Cards */}
      <div>
        <VocabularyCard id="1" title="Machinery Words" />
      </div>
    </div>
  );
}

export default Vocabularies;
