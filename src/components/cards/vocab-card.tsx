import { FC } from "react";
import { VocabularyCardProps } from "@/types/vocabs";

const VocabularyCard: FC<VocabularyCardProps> = ({ id, title }) => {
  return (
    <div
      className="bg-white rounded-2xl mb-4 border border-gray-200"
      style={{ minWidth: 260 }}
    >
      <div className="p-5">
        {/* Title + Bookmark */}
        <div className="flex-row justify-between items-start mb-3">
          <div className="flex-1 mr-3">
            <p className="text-xl font-bold text-gray-900 leading-6">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyCard;
