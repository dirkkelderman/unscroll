import { createClient } from "@/utils/supabase/server";
import { UnifiedReminder } from "@/lib/types";

export async function getRemindersByMonth(monthNumber: number) {
  const supabase = await createClient();
  const { data: reminders, error } = await supabase.rpc("get_posts_by_month", {
    month_number: monthNumber,
  });

  return { reminders, error };
}

export async function getRemindersByDay(dayNumber: number) {
  const supabase = await createClient();
  const { data: reminders, error } = await supabase.rpc("get_posts_by_day", {
    day_number: dayNumber,
  });
  return { reminders, error };
}

export async function getRemindersByMonthAndDay(month: number, day: number) {
  const supabase = await createClient();

  const [commentsResult, mediaResult] = await Promise.all([
    supabase.rpc("get_posts_by_month_and_day", {
      month_number: month,
      day_number: day,
    }),
    supabase.rpc("get_media_by_month_and_day", {
      month_number: month,
      day_number: day,
    }),
  ]);

  const reminders: UnifiedReminder[] = [
    ...(commentsResult.data || []),
    ...(mediaResult.data || []),
  ].sort(
    (a, b) =>
      new Date(a.original_date).getTime() - new Date(b.original_date).getTime()
  );

  return {
    reminders,
    error: commentsResult.error || mediaResult.error,
  };
}
