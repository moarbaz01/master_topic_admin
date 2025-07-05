import { supabase } from "../lib/supabase/client";

export const AuthService = {
  async sendOtp(phone: string) {
    const { error } = await supabase.auth.signInWithOtp({
      phone: phone,
    });

    if (error) {
      throw new Error(error.message);
    }
  },

  async verifyOtp(phone: string, otp: string) {
    const { error } = await supabase.auth.verifyOtp({
      phone: phone,
      token: otp,
      type: "sms",
    });

    if (error) {
      throw new Error(error.message);
    }
  },

  async signOut() {
    await supabase.auth.signOut();
  },

  async getUser() {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error(authError?.message || "Not authenticated");
    }

    const { data, error } = await supabase
      .from("profile") // ✅ correct table name
      .select("id, role") // ✅ select needed fields
      .eq("id", user.id)
      .single(); // ✅ only one row expected

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
};
