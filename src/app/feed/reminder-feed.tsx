"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UnifiedReminder } from "@/lib/types";
import { ExternalLink } from "lucide-react";

interface ReminderFeedProps {
  reminders: UnifiedReminder[];
}

export function ReminderFeed({ reminders }: ReminderFeedProps) {
  const groupedReminders = reminders.reduce((acc, reminder) => {
    const date = new Date(reminder.original_date);
    const key = formatDate(date);
    if (!acc[key]) acc[key] = [];
    acc[key].push(reminder);
    return acc;
  }, {} as Record<string, UnifiedReminder[]>);

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

function ReminderCard({ reminder }: { reminder: UnifiedReminder }) {
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
              {reminder.type === "comment" &&
                reminder.author &&
                ` • ${reminder.author}`}
              {(reminder.type === "photo" || reminder.type === "video") &&
                reminder.source_name &&
                ` • ${reminder.source_name}`}
            </CardDescription>
          </div>
          <Badge>{reminder.type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {reminder.type === "comment" ? (
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {reminder.content}
          </p>
        ) : (
          <div className="space-y-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {reminder.type === "photo" ? "Photo" : "Video"} from{" "}
                  {reminder.source_name}
                </p>
                <a
                  href={reminder.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-500 hover:underline"
                >
                  View on Facebook <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        )}
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
