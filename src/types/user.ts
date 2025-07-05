export interface UserType {
  id: string;
  role: "admin" | "user";
  subscription: "basic" | "premium";
  phone: string;
  name: string;
  gender: string;
}

export type GetUsersParams = {
  page?: number;
  limit?: number;
  name?: string;
  phone?: string;
  role?: string;
  subscription?: string;
};

export type UpdateUserType = Partial<Omit<UserType, "id">>;