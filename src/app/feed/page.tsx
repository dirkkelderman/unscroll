import { ReminderFeed } from "@/app/feed/reminder-feed";
import { getRemindersByMonthAndDay } from "./actions";

export default async function FeedPage() {
  // Get today's date
  const today = new Date();
  const currentMonth = today.getMonth() + 1;

  const { reminders, error } = await getRemindersByMonthAndDay(
    currentMonth,
    today.getDate()
  );
  if (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <main className="container max-w-2xl py-6">
      <h1 className="text-3xl font-bold mb-6" suppressHydrationWarning>
        Memories from {today.toLocaleDateString("nl-NL", { month: "long" })}
      </h1>
      <ReminderFeed reminders={reminders || []} />
    </main>
  );
}
