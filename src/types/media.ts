export interface MediaType {
  id: string;
  type: string;
  name: string;
  url: string;
  size: number;
  publicId: string;
  format: string;
  duration?: number;
  width?: number;
  height?: number;
  tags?: string[];
}

export type GetMediaParams = {
  page?: number;
  limit?: number;
  type?: string; // "image" | "video" etc.
  name?: string; // name or tag search
  tag?: string;
};

export type CreateMediaType = Omit<MediaType, "id">;
