import { BookType } from "@/types/book";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { MediaSelectInput } from "../media-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { useAddBook, useUpdateBook } from "@/queries/book";

interface BookModalProps {
  open: boolean;
  onClose: () => void;
  book?: BookType; // Pass if editing
}

const BookModal = ({ open, onClose, book }: BookModalProps) => {
  const isEditing = !!book;
  const [bookData, setBookData] = useState<Omit<BookType, "id">>({
    title: "",
    description: "",
    pdf_url: "",
    is_paid: false,
    price: 0,
    thumbnail_url: "",
  });

  const addBook = useAddBook();
  const updateBook = useUpdateBook();

  useEffect(() => {
    if (book) {
      const { id, ...rest } = book;
      setBookData(rest);
    } else {
      setBookData({
        title: "",
        description: "",
        pdf_url: "",
        is_paid: false,
        price: 0,
        thumbnail_url: "",
      });
    }
  }, [book]);

  const handleChange = (name: string, value: any) => {
    setBookData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!bookData.title || !bookData.pdf_url) {
      toast.error("Title and PDF are required");
      return;
    }

    const payload = { ...bookData };

    try {
      if (isEditing) {
        await updateBook.mutateAsync({ id: book!.id, data: payload });
      } else {
        await addBook.mutateAsync(payload);
      }
      toast.success(`Book ${isEditing ? "updated" : "added"} successfully`);
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Book" : "Add Book"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-4">
            <Label>Title</Label>
            <Input
              placeholder="Enter book title"
              value={bookData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label>Description (optional)</Label>
            <Textarea
              placeholder="Enter book description"
              value={bookData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <MediaSelectInput
            value={bookData.thumbnail_url}
            onChange={(e) => handleChange("thumbnail_url", e)}
            label="Thumbnail (optional)"
          />

          <MediaSelectInput
            value={bookData.pdf_url}
            onChange={(e) => handleChange("pdf_url", e)}
            label="PDF"
          />

          <div className="space-y-4">
            <Label>Is Paid</Label>
            <Select
              value={bookData.is_paid ? "Yes" : "No"}
              onValueChange={(e) => handleChange("is_paid", e === "Yes")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Is this Paid?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {bookData.is_paid && (
            <div className="space-y-4">
              <Label>Price</Label>
              <Input
                type="number"
                placeholder="Enter price"
                value={bookData.price === 0 ? "" : bookData.price}
                onChange={(e) =>
                  handleChange("price", Number(e.target.value) || 0)
                }
              />
            </div>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isEditing ? "Update Book" : "Add Book"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookModal;
