import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommentsUploader } from "./comments-uploader";
import { MediaUploader } from "./media-uploader";

export default function UploadPage() {
  return (
    <main className="container max-w-2xl py-6">
      <h1 className="text-3xl font-bold mb-6">Upload Facebook Data</h1>

      <Card>
        <CardHeader>
          <CardTitle>Choose data type to import</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="comments">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="media">Photos & Videos</TabsTrigger>
            </TabsList>
            <TabsContent value="comments">
              <CommentsUploader />
            </TabsContent>
            <TabsContent value="media">
              <MediaUploader />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
