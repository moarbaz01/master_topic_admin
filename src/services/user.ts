// services/user-service.ts

import { UserType, UpdateUserType, GetUsersParams } from "@/types/user";
import { supabase } from "@/lib/supabase/client";

export const UserService = {
  // Get all users
  async getUsers(
    params: GetUsersParams = {}
  ): Promise<{ data: UserType[]; count: number }> {
    const { page = 1, limit = 10, name, phone, role, subscription } = params;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from("profile").select("*", { count: "exact" });

    // Filter: name (partial match)
    if (name) {
      query = query.ilike("name", `%${name}%`);
    }

    // Filter: phone (partial match)
    if (phone) {
      query = query.ilike("phone", `%${phone}%`);
    }

    // Filter: role (exact match)
    if (role) {
      query = query.eq("role", role);
    }

    // Filter: subscription (exact match)
    if (subscription) {
      query = query.eq("subscription", subscription);
    }

    // Pagination
    query = query.range(from, to);

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);
    return { data, count: count || 0 };
  },

  // Delete user by id
  async deleteUser(id: string) {
    const { error } = await supabase.from("profile").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },

  // Update user by id
  async updateUser(id: string, userData: UpdateUserType): Promise<UserType> {
    const { data, error } = await supabase
      .from("profile")
      .update(userData)
      .eq("id", id)
      .select("*")
      .single(); // Ensure only one result
    if (error) throw new Error(error.message);
    return data;
  },

  // Optional: Get a user by id
  async getUserById(id: string): Promise<UserType> {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },
};
