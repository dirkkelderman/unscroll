import { MediaReminder } from "../types";

export class FacebookMediaParser {
  async parseMedia(file: File): Promise<MediaReminder[]> {
    const content = await file.text();
    const data = JSON.parse(content);

    return data.map((item: any) => {
      const nameValue = item.label_values.find((l: any) => l.label === "Naam");
      const urlValue = item.label_values.find((l: any) => l.label === "URL");

      return {
        type: item.ent_name === "EntAlbumPhoto" ? "photo" : "video",
        title: nameValue?.value || "Memory",
        url: urlValue?.value || "",
        source_name: nameValue?.value || "",
        source_url: nameValue?.href || "",
        original_date: new Date(item.timestamp * 1000).toISOString(),
        source_file: "photos_and_videos.json",
        source_id: item.fbid,
        metadata: item,
      };
    });
  }
}
