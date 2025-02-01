import { createClient } from "@/utils/supabase/server";

export const deleteUser = async (req: Request) => {
  const supabase = await createClient();

  const { user_id } = await req.json();

  const { error } = await supabase.auth.admin.deleteUser(user_id);

  if (error) throw error;

  return new Response(JSON.stringify({ success: true }));
};
