"use client";
import BookCard from "@/components/cards/book-card";
import BookModal from "@/components/modals/book-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { useBook } from "@/queries/book";
import { BookType } from "@/types/book";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

const Books = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);

  const handleEdit = (book: BookType) => {
    setSelectedBook(book);
    setShowAddBookModal(true);
  };

  const { data, isLoading } = useBook({ title: searchTitle });
  const books = data?.data || [];
  const count = data?.count || 0;
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Books</h1>
            <p className="text-muted-foreground">
              Manage and track your books portfolio
            </p>
          </div>
          <Button
            onClick={() => {
              setShowAddBookModal(true);
            }}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
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

        <p className="text-sm text-muted-foreground">
          {count} {count === 1 ? "book" : "books"} found
        </p>

        {isLoading ? (
          <div className="flex">
            <Loader label="Loading books..." />
          </div>
        ) : books.length === 0 ? (
          <p>No books found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                handleEdit={() => handleEdit(book)}
              />
            ))}
          </div>
        )}
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
