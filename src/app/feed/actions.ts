import { createClient } from "@/utils/supabase/server";

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

export async function getRemindersByMonthAndDay(
  monthNumber: number,
  dayNumber: number
) {
  const supabase = await createClient();
  const { data: reminders, error } = await supabase.rpc(
    "get_posts_by_month_and_day",
    {
      month_number: monthNumber,
      day_number: dayNumber,
    }
  );
  return { reminders, error };
}
