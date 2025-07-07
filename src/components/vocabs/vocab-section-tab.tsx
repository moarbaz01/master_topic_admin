"use client";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  ImageIcon,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  Volume2,
} from "lucide-react";
import { TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useMemo, useState } from "react";
import {
  useCreateVocabularySection,
  useDeleteVocabularySection,
  useUpdateVocabularySection,
  useVocabularySections,
  useCreateVocabularyWord,
  useDeleteVocabularyWord,
  useUpdateVocabularyWord,
  useVocabularyWords,
} from "@/queries/vocabulary";
import { VocabularySectionType, VocabularyWordType } from "@/types/vocabs";
import toast from "react-hot-toast";
import { MediaSelectInput } from "../media-select";

// VocabSectionTab Component
export const VocabSectionTab = ({
  vocabulary,
}: {
  vocabulary: { id: string; title: string };
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingActions, setLoadingActions] = useState(new Set<string>());
  // Sections Hooks
  const createSection = useCreateVocabularySection();

  const { data: allSections, isLoading: sectionsLoading } =
    useVocabularySections(vocabulary.id);

  // Handle Add Section
  const handleAddSection = async () => {
    if (!vocabulary.id) return;
    try {
      setLoadingActions((prev) => new Set(prev).add("add-section"));
      await createSection.mutateAsync({
        vocabulary_id: vocabulary.id,
        title: "New Section",
      });
    } catch (error) {
      console.error("Error adding section:", error);
      toast.error("Failed to add section. Please try again.");
    } finally {
      setLoadingActions((prev) => {
        const newSet = new Set(prev);
        newSet.delete("add-section");
        return newSet;
      });
    }
  };

  return (
    <TabsContent value="sections" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Sections & Words</h2>
          <p className="text-muted-foreground">
            Organize your vocabulary into sections and add words
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search words..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            onClick={handleAddSection}
            disabled={loadingActions.has("add-section") || !vocabulary?.id}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Section
          </Button>
        </div>
      </div>

      {allSections?.length === 0 && vocabulary.id && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No sections yet</h3>
            <p className="text-muted-foreground mb-4">
              Start by creating your first section to organize your vocabulary
              words
            </p>
            <Button
              onClick={handleAddSection}
              disabled={loadingActions.has("add-section")}
            >
              {loadingActions.has("add-section") ? (
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              Create First Section
            </Button>
          </CardContent>
        </Card>
      )}

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {allSections?.map((section) => (
            <SectionCard
              key={section.id}
              vocabulary_id={vocabulary.id}
              section={section}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Fallback if id is not found */}
      {!vocabulary.id && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <p className="text-amber-800">
              Please save the vocabulary basic information first before adding
              sections.
            </p>
          </CardContent>
        </Card>
      )}
    </TabsContent>
  );
};

// SectionCard Component
const SectionCard = ({
  vocabulary_id,
  section,
}: {
  vocabulary_id: string;
  section: VocabularySectionType;
}) => {
  const [isSectionExpanded, setIsSectionExpanded] = useState(false);
  const [title, setTitle] = useState(section.title);
  const updateSection = useUpdateVocabularySection();
  const deleteSection = useDeleteVocabularySection();
  const createWord = useCreateVocabularyWord();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: sectionWords, isLoading: wordsLoading } = useVocabularyWords(
    section.id
  );

  // Handle Update Section
  const handleUpdateSection = async (sectionId: string, title: string) => {
    if (!vocabulary_id) return;
    try {
      await updateSection.mutateAsync({
        vocabulary_id,
        id: sectionId,
        title,
      });
    } catch (error) {
      console.error("Error updating section:", error);
      toast.error("Failed to update section. Please try again.");
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!vocabulary_id) return;
    try {
      await deleteSection.mutateAsync({
        vocabulary_id,
        id: sectionId,
      });
      toast.success("Section deleted successfully");
    } catch (error) {
      console.error("Error deleting section:", error);
      toast.error("Failed to delete section. Please try again.");
    }
  };

  const handleAddWord = async (sectionId: string) => {
    if (!vocabulary_id) return;
    try {
      await createWord.mutateAsync({
        section_id: sectionId,
        word: "New Word",
        definition: "",
      });
      toast.success("Word added successfully");
    } catch (error) {
      console.error("Error adding word:", error);
      toast.error("Failed to add word. Please try again.");
    }
  };

  const filteredWords = useMemo(() => {
    if (!searchTerm) return sectionWords || [];
    return (
      sectionWords?.filter((word) =>
        word.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    );
  }, [sectionWords, searchTerm]);

  return (
    <Card key={section.id}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Collapsible>
              <CollapsibleTrigger
                onClick={() => setIsSectionExpanded(!isSectionExpanded)}
                className="flex items-center gap-2 hover:bg-muted p-1 rounded"
              >
                {isSectionExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </CollapsibleTrigger>
            </Collapsible>
            <div className="flex items-center gap-2">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUpdateSection(section.id, title)}
                disabled={
                  updateSection.isPending || title.trim() === section.title
                }
              >
                {updateSection.isPending ? (
                  <RefreshCw className="w-3 h-3 animate-spin" />
                ) : (
                  <Save className="w-3 h-3" />
                )}
              </Button>
            </div>
            <Badge variant="secondary">{sectionWords?.length} words</Badge>
            {searchTerm && filteredWords.length !== sectionWords?.length && (
              <Badge variant="outline">{filteredWords.length} matching</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddWord(section.id)}
              disabled={createWord.isPending}
            >
              {createWord.isPending ? (
                <RefreshCw className="w-3 h-3 animate-spin mr-1" />
              ) : (
                <Plus className="w-3 h-3 mr-1" />
              )}
              Add Word
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeleteSection(section.id)}
              disabled={deleteSection.isPending}
            >
              {deleteSection.isPending ? (
                <RefreshCw className="w-3 h-3 animate-spin" />
              ) : (
                <Trash2 className="w-3 h-3" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <Collapsible open={isSectionExpanded}>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {sectionWords?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No words in this section yet</p>
                <Button
                  variant="outline"
                  className="mt-2 bg-transparent"
                  onClick={() => handleAddWord(section.id)}
                  disabled={createWord.isPending}
                >
                  {createWord.isPending ? (
                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Add First Word
                </Button>
              </div>
            ) : (
              sectionWords?.map((word, index) => (
                <WordCard key={word.id} initialWord={word} wordIndex={index} />
              ))
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

// WordCard Component
export const WordCard = ({
  initialWord,
  wordIndex,
}: {
  initialWord: VocabularyWordType;
  wordIndex: number;
}) => {
  const [word, setWord] = useState<VocabularyWordType>({
    ...initialWord,
  });
  const updateWord = useUpdateVocabularyWord();
  const deleteWord = useDeleteVocabularyWord();

  const handleChangeWord = (
    field: keyof VocabularyWordType,
    value: string | File | null
  ) => {
    setWord((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card key={word.id} className="border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline">#{wordIndex + 1}</Badge>
              {word.image && <ImageIcon className="w-4 h-4 text-blue-600" />}
              {word.audio && <Volume2 className="w-4 h-4 text-green-600" />}
              {updateWord.isPending && (
                <RefreshCw className="w-3 h-3 animate-spin" />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Word</Label>
                <Input
                  placeholder="Enter word"
                  value={word.word}
                  onChange={(e) => handleChangeWord("word", e.target.value)}
                  className="font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label>Definition</Label>
                <Textarea
                  placeholder="Enter definition"
                  value={word.definition}
                  onChange={(e) =>
                    handleChangeWord("definition", e.target.value)
                  }
                  className="min-h-[60px]"
                />
              </div>
            </div>

            {/* Media Upload Section */}
            <div className="flex flex-col gap-2">
              <MediaSelectInput
                value={word?.image ?? ""}
                title="Select Image"
                icon={<ImageIcon className="w-3 h-3" />}
                onChange={(e) => handleChangeWord("image", e)}
              />

              <MediaSelectInput
                value={word?.audio ?? ""}
                title="Select Audio"
                icon={<Volume2 className="w-3 h-3" />}
                onChange={(e) => handleChangeWord("audio", e)}
              />
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateWord.mutateAsync(word)}
              disabled={updateWord.isPending || !word.word.trim()}
            >
              {updateWord.isPending ? (
                <RefreshCw className="w-3 h-3 animate-spin" />
              ) : (
                <Save className="w-3 h-3" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                deleteWord.mutate({ id: word.id, section_id: word.section_id })
              }
              disabled={deleteWord.isPending}
            >
              {deleteWord.isPending ? (
                <RefreshCw className="w-3 h-3 animate-spin" />
              ) : (
                <Trash2 className="w-3 h-3" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
