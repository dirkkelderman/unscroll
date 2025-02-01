"use client";

import { ParsedReminder } from "@/lib/facebook-parser/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ReminderFeedProps {
  reminders: ParsedReminder[];
  today: Date;
}

export function ReminderFeed({ reminders }: ReminderFeedProps) {
  const groupedReminders = reminders.reduce((acc, reminder) => {
    const date = new Date(reminder.original_date);
    const key = formatDate(date);
    if (!acc[key]) acc[key] = [];
    acc[key].push(reminder);
    return acc;
  }, {} as Record<string, ParsedReminder[]>);

  // Sort the days in chronological order
  const sortedDays = Object.keys(groupedReminders).sort((a, b) => {
    const aDate = new Date(groupedReminders[a][0].original_date);
    const bDate = new Date(groupedReminders[b][0].original_date);
    return aDate.getTime() - bDate.getTime();
  });

  return (
    <div className="space-y-8">
      {sortedDays.map((day) => (
        <section key={day} className="space-y-4">
          <h2 className="text-2xl font-bold">{day}</h2>
          {groupedReminders[day].map((reminder, index) => (
            <ReminderCard key={index} reminder={reminder} />
          ))}
        </section>
      ))}
      {sortedDays.length === 0 && (
        <p className="text-muted-foreground text-center py-8">
          No memories found for this time period
        </p>
      )}
    </div>
  );
}

function ReminderCard({ reminder }: { reminder: ParsedReminder }) {
  const date = new Date(reminder.original_date);
  const year = date.getFullYear();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{reminder.title}</CardTitle>
            <CardDescription suppressHydrationWarning>
              {date.toLocaleDateString()} ({year})
              {reminder.author && ` • ${reminder.author}`}
            </CardDescription>
          </div>
          <Badge>{reminder.type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {reminder.content}
        </p>
      </CardContent>
    </Card>
  );
}

function formatDate(date: Date): string {
  return `${date.toLocaleDateString("nl-NL", {
    month: "long",
    day: "numeric",
  })} (${date.getFullYear()})`;
}
