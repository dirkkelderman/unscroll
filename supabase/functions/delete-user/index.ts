import { createClient } from "@supabase/supabase-js";

export const deleteUser = async (req: Request) => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { user_id } = await req.json();

  const { error } = await supabase.auth.admin.deleteUser(user_id);

  if (error) throw error;

  return new Response(JSON.stringify({ success: true }));
};
