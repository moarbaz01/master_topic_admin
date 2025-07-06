// app/vocabs/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface Word {
  id: number;
  text: string;
}

interface Section {
  id: number;
  title: string;
  words: Word[];
}

export default function VocabDetailPage() {
  const { id } = useParams();
  const [sections, setSections] = useState<Section[]>([]);
  const [newSectionTitle, setNewSectionTitle] = useState("");
 

  const addSection = () => {
    if (!newSectionTitle.trim()) return;
    const newSection: Section = {
      id: Date.now(),
      title: newSectionTitle,
      words: [],
    };
    setSections((prev) => [...prev, newSection]);
    setNewSectionTitle("");
  };

  const addWordToSection = (sectionId: number, word: string) => {
    if (!word.trim()) return;
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === sectionId
          ? {
              ...sec,
              words: [...sec.words, { id: Date.now(), text: word }],
            }
          : sec
      )
    );
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold">Vocabulary Set ID: {id}</h1>

      {/* Add new section */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="New section title"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
        />
        <Button onClick={addSection}>Add Section</Button>
      </div>

    

      {/* Sections List */}
      {sections.map((section) => (
        <Card key={section.id} className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="mb-3 list-disc list-inside space-y-1">
              {section.words.map((word) => (
                <li key={word.id}>{word.text}</li>
              ))}
            </ul>

            {/* Add Word to this section */}
            <AddWordForm
              onAddWord={(word) => addWordToSection(section.id, word)}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Subcomponent to handle adding words
function AddWordForm({ onAddWord }: { onAddWord: (word: string) => void }) {
  const [word, setWord] = useState("");

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onAddWord(word);
        setWord("");
      }}
    >
      <Input
        placeholder="Enter word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <Button type="submit">Add</Button>
    </form>
  );
}
