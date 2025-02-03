"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";
import { FacebookParser } from "@/lib/facebook-parser";
import { uploadComments } from "./actions";

export function CommentsUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const parser = new FacebookParser();
      const comments = await parser.parseComments(file);

      const { error } = await uploadComments(comments);

      if (error) throw error;

      toast({
        title: "Upload successful",
        description: `Imported ${comments.length} comments`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your comments.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Upload your comments.json file from your Facebook data export
      </p>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </div>

      {isUploading && (
        <div className="flex items-center space-x-2">
          <Icons.spinner className="h-4 w-4 animate-spin" />
          <p className="text-sm text-muted-foreground">
            Processing comments...
          </p>
        </div>
      )}
    </div>
  );
}
