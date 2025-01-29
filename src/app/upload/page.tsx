import { UploadSteps } from "./upload-steps";
import { UploadForm } from "./upload-form";

export default function UploadPage() {
  return (
    <div className="container max-w-4xl py-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Upload Your Facebook Data</h1>
        <p className="text-muted-foreground">
          Follow these steps to download your data from Facebook and upload it
          to our application.
        </p>
      </div>

      <UploadSteps />

      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Upload Your Data</h2>
        <UploadForm />
      </div>
    </div>
  );
}
