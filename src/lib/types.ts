export type ReminderType = "comment" | "photo" | "video";

export interface BaseReminder {
  id: string;
  type: ReminderType;
  title: string;
  original_date: string;
  source_file: string;
  source_id: string;
  metadata: any;
}

export interface CommentReminder extends BaseReminder {
  type: "comment";
  content: string;
  author: string;
  people: string[];
}

export interface MediaReminder extends BaseReminder {
  type: "photo" | "video";
  url: string;
  source_name: string;
  source_url: string;
}

export type UnifiedReminder = CommentReminder | MediaReminder;
