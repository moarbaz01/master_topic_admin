export interface BookType {
  id: string;
  title: string;
  description: string;
  pdf_url: string;
  is_paid: boolean;
  thumbnail_url?: string;
  price: number;
}

export type GetBookParams = {
  page?: number;
  limit?: number;
  title?: string; // name or tag search
};

export type CreateBookType = Omit<BookType, "id">;
