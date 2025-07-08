"use client";
import { FC } from "react";
import { Card } from "../ui/card";
import { Edit, Trash, WholeWord } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { VocabularyType } from "@/types/vocabs";

const VocabularyCard: FC<VocabularyType> = ({ id, title }) => {
  const router = useRouter();
  const handleDelete = async () => {};
  return (
    <Card className="flex items-center justify-between p-3 w-full max-w-[200px] text-sm">
      <div className="flex items-center gap-2 truncate">
        <WholeWord className="w-4 h-4" />
        <span className="truncate">{title}</span>
      </div>
      <div className="flex gap-1">
        <Button
          onClick={() => router.push(`/vocabs/${id}`)}
          size="icon"
          className="h-7 w-7"
        >
          <Edit className="w-3.5 h-3.5" />
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-400 text-white h-7 w-7"
          size="icon"
          onClick={handleDelete}
        >
          <Trash className="w-3.5 h-3.5" />
        </Button>
      </div>
    </Card>
  );
};

export default VocabularyCard;
