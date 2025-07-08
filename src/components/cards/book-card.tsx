"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookType } from "@/types/book";
import { Edit, Trash, View } from "lucide-react";
import Image from "next/image";
import { useDeleteBook } from "@/queries/book";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BookCardProps {
  book: BookType;
  handleEdit?: () => void;
}

export default function BookCard({ book, handleEdit }: BookCardProps) {
  const deleteBook = useDeleteBook();
  const [isVisible, setIsVisible] = useState(true);

  const handleDelete = () => {
    setIsVisible(false); // start animation
    setTimeout(() => {
      deleteBook.mutate({ id: book.id }); // delete after animation
    }, 300); // match with animation duration
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-full md:h-[150px] flex flex-col md:flex-row p-2 overflow-hidden">
            <div className="md:w-[150px] w-full h-[200px] md:h-full flex-shrink-0 relative overflow-hidden rounded-md">
              {book.thumbnail_url ? (
                <Image
                  src={book.thumbnail_url}
                  alt={book.title}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500 text-sm text-center">
                    No Image Available
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col flex-1 bg-white p-2 rounded-xl justify-between overflow-hidden">
              <div className="space-y-1 overflow-hidden">
                <p className="text-base font-semibold truncate">{book.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-2 break-words">
                  {book.description}
                </p>
                <p className="text-sm font-semibold text-primary">
                  {book.is_paid ? `$${book.price.toFixed(2)}` : "Free"}
                </p>
              </div>

              <div className="flex gap-2 pt-2 shrink-0">
                <a
                  href={book.pdf_url}
                  target="_blank"
                  className="bg-blue-500 rounded-md flex items-center justify-center py-1 px-2 hover:bg-blue-400 transition text-white"
                >
                  <View className="h-4 w-4" />
                </a>
                <Button
                  onClick={handleEdit}
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-400 text-white h-8 w-8"
                  size="icon"
                  onClick={handleDelete}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
