"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookType } from "@/types/book";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";

interface BookCardProps {
  book: BookType;
}

export function BookCard({ book }: BookCardProps) {
  const handleDelete = () => {};
  return (
    <Card className="w-[280px] h-[180px] flex flex-row border items-stretch rounded-2xl hover:shadow-lg transition duration-200">
      {book.thumbnail_url ? (
        <div className="w-[40%] h-full overflow-hidden p-2">
          <Image
            src={book.thumbnail_url}
            alt={book.title}
            width={200}
            height={300}
            className="object-contain h-full w-full"
            priority
          />
        </div>
      ) : (
        <div
          className="w-[40%] h-full bg-gray-200 flex items
          justify-center p-2"
        >
          <p className="text-gray-500">No Image Available</p>
        </div>
      )}

      <div className="w-[60%] flex flex-col justify-between p-2">
        <div className="space-y-1 overflow-hidden">
          <p className="text-base font-semibold truncate">{book.title}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {book.description}
          </p>
          <p className="text-sm font-semibold text-primary">
            {book.is_paid ? `$${book.price.toFixed(2)}` : "Free"}
          </p>
        </div>

        <div className="flex gap-2">
          <Button size="icon" variant="outline" className="h-8 w-8">
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
  );
}
