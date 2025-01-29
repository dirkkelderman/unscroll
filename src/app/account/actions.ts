"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteAccount(userId: string) {
  try {
    const supabase = await createClient();

    // First mark the user's profile as deleted
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", userId);

    if (profileError) throw profileError;

    // Mark the auth account as deleted in user metadata
    const { error: userError } = await supabase.auth.updateUser({
      data: {
        deleted_at: new Date().toISOString(),
        deleted: true,
      },
    });

    if (userError) throw userError;

    revalidatePath("/account");
    return { success: true };
  } catch (error) {
    console.error("Error deleting account:", error);
    return { success: false, error };
  }
}
