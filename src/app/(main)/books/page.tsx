"use client";
import { BookCard } from "@/components/cards/book-card";
import BookModal from "@/components/modals/book-modal";
import AddBookModal from "@/components/modals/book-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBook } from "@/queries/book";
import { BookType } from "@/types/book";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

const Books = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const { data, isLoading } = useBook({});

  const books = data?.data || [];
  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Books</h2>
          <Button
            onClick={() => {
              setShowAddBookModal(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Book
          </Button>
        </div>

        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search book by title..."
            className="pl-10"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>

        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : books.length === 0 ? (
            <p>No books found</p>
          ) : (
            <ul className="space-y-4 flex flex-wrap gap-2">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </ul>
          )}
        </div>
      </div>

      <BookModal
        open={showAddBookModal || !!selectedBook}
        onClose={() => {
          setShowAddBookModal(false);
          setSelectedBook(null);
        }}
        book={selectedBook || undefined}
      />
    </>
  );
};

export default Books;
