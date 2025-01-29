import { FacebookComment, ParsedReminder } from "./types";

export class FacebookParser {
  async parseComments(file: File): Promise<ParsedReminder[]> {
    try {
      const content = await file.text();
      const data = JSON.parse(content);

      if (!data.comments_v2 || !Array.isArray(data.comments_v2)) {
        console.warn("No comments found in file");
        return [];
      }

      return data.comments_v2
        .filter(
          (comment: FacebookComment) =>
            comment.data && comment.data.length > 0 && comment.data[0].comment
        )
        .map((comment: FacebookComment) => {
          const commentData = comment.data[0].comment;
          return {
            type: "comment" as const,
            title: comment.title || "Comment",
            content: commentData.comment || "",
            original_date: new Date(comment.timestamp * 1000),
            author: commentData.author || "Unknown",
            source_file: "comments.json",
            source_id: comment.timestamp.toString(),
            people: [commentData.author].filter(Boolean),
            media_urls: [],
            metadata: comment,
          };
        });
    } catch (error) {
      console.error("Failed to parse comments:", error);
      return [];
    }
  }
}
