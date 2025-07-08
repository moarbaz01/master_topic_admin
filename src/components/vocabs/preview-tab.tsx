import { BookOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TabsContent } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import {
  useVocabularySections,
  useVocabularyWords,
} from "@/queries/vocabulary";
import { VocabularySectionType } from "@/types/vocabs";

export const PreviewTab = ({
  vocabulary,
}: {
  vocabulary: { id: string; title?: string };
}) => {
  const { data: sections, isLoading: sectionsLoading } = useVocabularySections(
    vocabulary.id
  );

  return (
    <TabsContent value="preview" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Vocabulary Preview
          </CardTitle>
          <CardDescription>Review your vocabulary collection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {vocabulary.title || "Untitled Vocabulary"}
                </div>
                <p className="text-sm text-muted-foreground">
                  Collection Title
                </p>
              </CardContent>
            </Card>
            {/* <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{getTotalWords()}</div>
                <p className="text-sm text-muted-foreground">Total Words</p>
              </CardContent>
            </Card> */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{sections?.length}</div>
                <p className="text-sm text-muted-foreground">Sections</p>
              </CardContent>
            </Card>
            {/* <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{getWordsWithMedia()}</div>
                <p className="text-sm text-muted-foreground">With Media</p>
              </CardContent>
            </Card> */}
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sections Overview</h3>
            {sections?.map((section, index) => {
              return (
                <SectionCard key={section.id} section={section} index={index} />
              );
            })}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

const SectionCard = ({
  section,
  index,
}: {
  section: VocabularySectionType;
  index: number;
}) => {
  const { data: sectionWords = [], isLoading: wordsLoading } =
    useVocabularyWords(section.id);
  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-medium">{section.title}</h4>
            <p className="text-sm text-muted-foreground">
              {sectionWords?.length} words
            </p>
          </div>
          <Badge variant="outline">Section {index + 1}</Badge>
        </div>

        {/* Sample words preview */}
        {sectionWords?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {sectionWords?.map((word, index) => (
              <div key={word.id} className="p-2 bg-muted rounded-md flex flex-row gap-4 text-sm">
                <div className="text-sm bg-primary h-8 w-8 text-white flex items-center justify-center rounded-full mb-1">
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium">{word.word}</div>
                  <div className="text-muted-foreground truncate">
                    {word.definition}
                  </div>
                </div>
              </div>
            ))}
            {sectionWords?.length > 6 && (
              <div className="p-2 bg-muted rounded text-sm flex items-center justify-center text-muted-foreground">
                +{sectionWords.length - 6} more
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
