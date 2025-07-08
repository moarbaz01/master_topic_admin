"use client";
import { useUpdateVocabulary } from "@/queries/vocabulary";
import { useEffect, useState } from "react";
import { TabsContent } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Check, RefreshCw, Save } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const BasicInfoTab = ({
  vocabularyData,
}: {
  vocabularyData?: { id: string; title: string };
}) => {
  const [title, setTitle] = useState(vocabularyData?.title || "");
  const [saving, setSaving] = useState(false);
  const updateVocabulary = useUpdateVocabulary();

  useEffect(() => {
    setTitle(vocabularyData?.title || "");
  }, [vocabularyData?.title]);

  const handleSave = async () => {
    if (!title.trim() || !vocabularyData?.id) return;

    setSaving(true);
    try {
      await updateVocabulary.mutateAsync({ id: vocabularyData?.id, title });
    } catch (error) {
      console.error("Error saving vocabulary:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <TabsContent value="basic" className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Vocabulary Information</CardTitle>
              <CardDescription>
                Set up the basic details for your vocabulary collection.
              </CardDescription>
            </div>
            {vocabularyData?.id && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                Saved
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vocab-title">Vocabulary Title</Label>
            <div className="flex items-center gap-2">
              <Input
                id="vocab-title"
                placeholder="Enter title (e.g., Business English)"
                value={title}
                className="max-w-md"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button
                onClick={handleSave}
                disabled={saving || !title.trim()}
                size="sm"
              >
                {saving ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default BasicInfoTab;
