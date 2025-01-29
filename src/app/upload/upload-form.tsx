"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { createClient } from "@/utils/supabase/client";
import { FacebookParser } from "@/lib/facebook-parser";
import { useToast } from "@/hooks/use-toast";
import { Dropzone } from "@/components/ui/dropzone";

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const supabase = createClient();
  const { toast } = useToast();
  const parser = new FacebookParser();

  const handleDrop = async (acceptedFiles: File[]) => {
    const commentFile = acceptedFiles.find((f) => f.name === "comments.json");
    if (commentFile) {
      setFile(commentFile);
      try {
        const reminders = await parser.parseComments(commentFile);
        console.log("Parsed reminders:", reminders);
      } catch (error) {
        console.error("Preview failed:", error);
      }
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload comments.json",
        variant: "destructive",
      });
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsUploading(true);
      setProgress(0);

      // Parse the file
      const reminders = await parser.parseComments(file);

      if (reminders.length === 0) {
        throw new Error("No comments found in file");
      }

      // Upload to Supabase
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Store reminders in database
      const { error } = await supabase.from("reminders").insert(
        reminders.map((reminder) => ({
          ...reminder,
          user_id: session?.user.id,
        }))
      );

      if (error) throw error;

      setProgress(100);
      toast({
        title: "Success!",
        description: `Processed ${reminders.length} comments`,
      });
    } catch (error) {
      console.error("Upload failed:", error);
      toast({
        title: "Error",
        description: "Failed to process comments",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Dropzone onDrop={handleDrop} disabled={isUploading} />

      {file && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Selected: {file.name}</p>
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? "Processing..." : "Process Comments"}
          </Button>
        </div>
      )}

      {(isUploading || progress === 100) && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">
            {progress === 100 ? "Complete!" : "Processing..."}
          </p>
        </div>
      )}
    </div>
  );
}
