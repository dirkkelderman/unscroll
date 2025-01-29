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
import { ScrollArea } from "@/components/ui/scroll-area";

interface ReminderPreviewProps {
  reminders: ParsedReminder[];
}

export function ReminderPreview({ reminders }: ReminderPreviewProps) {
  const groupedByType = reminders.reduce((acc, reminder) => {
    acc[reminder.type] = (acc[reminder.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <CardDescription className="flex gap-2">
          {Object.entries(groupedByType).map(([type, count]) => (
            <Badge key={type} variant="secondary">
              {count} {type}
              {count > 1 ? "s" : ""}
            </Badge>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {reminders.map((reminder, index) => (
              <Card key={index}>
                <CardHeader className="py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {reminder.title}
                    </CardTitle>
                    <Badge>{reminder.type}</Badge>
                  </div>
                  <CardDescription>
                    {reminder.original_date.toLocaleDateString()}
                    {reminder.location && ` • ${reminder.location}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {reminder.content}
                  </p>
                  {reminder.media_urls.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground">
                        {reminder.media_urls.length} media file
                        {reminder.media_urls.length > 1 ? "s" : ""} attached
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
