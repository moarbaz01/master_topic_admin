"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { BookType } from "@/types/book";
import { Edit, Trash, ExternalLink, DollarSign, BookOpen } from "lucide-react";
import Image from "next/image";
import { useDeleteBook } from "@/queries/book";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getThumbnailUrl } from "@/utils/thumbGenerater";

interface BookCardProps {
  book: BookType;
  handleEdit?: () => void;
}

export default function BookCard({ book, handleEdit }: BookCardProps) {
  const deleteBook = useDeleteBook();
  const [isVisible, setIsVisible] = useState(true);

  const handleDelete = () => {
    setIsVisible(false);
    setTimeout(() => {
      deleteBook.mutate({ id: book.id });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <Card className="group relative pt-0 pb-2 overflow-hidden bg-white hover:shadow-md transition-shadow duration-200 h-full">
            {/* Thumbnail Section */}
            <div className="relative h-40 overflow-hidden bg-gray-50">
              <Image
                src={book?.thumbnail_url || getThumbnailUrl(book.pdf_url, "pdf")}
                alt={book.title}
                fill
                className="object-cover"
                priority
              />
              {/* ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
              )} */}

              {/* Price badge */}
              <div className="absolute top-2 right-2">
                <Badge
                  variant={book.is_paid ? "default" : "secondary"}
                  className="text-xs"
                >
                  {book.is_paid ? (
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {book.price.toFixed(2)}
                    </div>
                  ) : (
                    "Free"
                  )}
                </Badge>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-1">
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-base text-gray-900 line-clamp-2 leading-tight">
                  {book.title}
                </h3>
                <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* Action Section */}
              <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
                <a
                  href={book.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View PDF
                </a>

                <div className="flex gap-1">
                  <Button
                    onClick={handleEdit}
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 bg-transparent"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleDelete}
                    className="h-8 w-8 p-0 bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
