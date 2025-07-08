export interface TagType {
  id: string;
  name: string;
}

export interface GetTagsParams {
  page?: number;
  limit?: number;
  name?: string;
}
