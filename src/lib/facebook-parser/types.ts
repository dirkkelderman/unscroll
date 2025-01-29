/**
 * Raw Facebook comment data structure
 */
export interface FacebookComment {
  timestamp: number;
  data: Array<{
    comment: {
      timestamp: number;
      comment: string;
      author: string;
    };
  }>;
  title: string;
}

/**
 * Processed reminder data structure
 */
export interface ParsedReminder {
  type: "comment";
  title: string;
  content: string;
  original_date: Date;
  media_urls: string[];
  location?: string;
  source_file: string;
  source_id?: string;
  people?: string[];
  author?: string;
  metadata: Record<string, unknown>; // More type-safe than 'any'
}
