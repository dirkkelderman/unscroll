"use client";

import * as React from "react";
import {
  useDropzone,
  DropzoneProps as ReactDropzoneProps,
} from "react-dropzone";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

interface DropzoneProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop"> {
  onDrop: ReactDropzoneProps["onDrop"];
  disabled?: boolean;
}

export function Dropzone({
  onDrop,
  disabled = false,
  className,
  ...props
}: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled,
    accept: {
      "application/json": [".json"],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-400 bg-gray-50 px-6 py-8 text-center hover:bg-gray-50/50",
        isDragActive && "border-primary bg-primary/10",
        disabled && "pointer-events-none opacity-60",
        className
      )}
      {...props}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        <Icons.upload className="h-10 w-10 text-muted-foreground" />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <p className="text-base">
              Drag & drop files here, or click to select
            </p>
            <p className="text-sm text-muted-foreground">
              Upload your Facebook JSON files
            </p>
          </>
        )}
      </div>
    </div>
  );
}
