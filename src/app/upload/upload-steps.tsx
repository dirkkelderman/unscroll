import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UploadSteps() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Step 1: Download Your Facebook Data</CardTitle>
          <CardDescription>
            Request and download a copy of your Facebook information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Go to Facebook and click your profile picture in the top right
            </li>
            <li>
              Select <strong>Settings & privacy</strong>, then click{" "}
              <strong>Settings</strong>
            </li>
            <li>
              In the left column, click{" "}
              <strong>Download your information</strong>
            </li>
            <li>
              Click <strong>Download or transfer information</strong>
            </li>
            <li>
              Select the following data:
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Posts</li>
                <li>Photos and videos</li>
                <li>Comments</li>
                <li>Likes and reactions</li>
              </ul>
            </li>
            <li>
              Select format: <strong>JSON</strong>
            </li>
            <li>
              Click <strong>Request a download</strong>
            </li>
          </ol>
          <p className="text-sm text-muted-foreground mt-4">
            Facebook will notify you when your file is ready to download. This
            may take several hours.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Step 2: Upload Your Data</CardTitle>
          <CardDescription>
            Once you have your Facebook data, upload it here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>After downloading your Facebook data:</p>
          <ol className="list-decimal list-inside space-y-2 mt-2">
            <li>Unzip the downloaded file</li>
            <li>Look for the JSON files in the unzipped folder</li>
            <li>Use the upload form below to upload your data</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
