"use server";

import { createClient } from "@/utils/supabase/server";
import { MediaReminder } from "@/lib/types";
import { ParsedReminder } from "@/lib/facebook-parser/types";

export async function uploadMedia(mediaItems: MediaReminder[]) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  const { error } = await supabase.from("media_reminders").insert(
    mediaItems.map((item) => ({
      ...item,
      user_id: user.data.user?.id,
    }))
  );

  return { error };
}

export async function uploadComments(comments: ParsedReminder[]) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  const { error } = await supabase.from("reminders").insert(
    comments.map((item) => ({
      ...item,
      user_id: user.data.user?.id,
    }))
  );

  return { error };
}
