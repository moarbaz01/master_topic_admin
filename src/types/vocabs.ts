export interface VocabularyType {
  id: string;
  title: string;
}

export interface VocabularySectionType {
  id: string;
  title: string;
  vocabulary_id: string;
}

export interface VocabularyWordType {
  id: string;
  section_id: string;
  word: string;
  definition: string;
  image?: string | null;
  audio?: string | null;
}

export interface VocabSectionTabUIProps {
  vocabulary: { id: string };
  sections: VocabularySectionType[];
  words: VocabularyWordType[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  expandedSections: Set<string>;
  loadingActions: Set<string>;
  toggleSectionExpanded: (sectionId: string) => void;
  getSectionWords: (sectionId: string) => VocabularyWordType[];
  getFilteredWords: (words: VocabularyWordType[]) => VocabularyWordType[];
  handleAddSection: () => void;
  handleUpdateSection: (
    sectionId: string,
    data: Partial<VocabularySectionType>
  ) => void;
  handleDeleteSection: (sectionId: string) => void;
  handleAddWord: (sectionId: string) => void;
  handleUpdateWord: (wordId: string, data: Partial<VocabularyWordType>) => void;
  handleDeleteWord: (wordId: string) => void;
}
