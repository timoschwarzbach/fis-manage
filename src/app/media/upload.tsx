"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useToast } from "~/hooks/use-toast";
import {
  handleUpload,
  MAX_FILE_SIZE_NEXTJS_ROUTE,
  validateFiles,
} from "~/lib/client/minio";
import { api } from "~/trpc/react";

export function UploadFile() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const getPresignedUrls = api.files.s3Presigned.useMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (files.length) {
        // Create the expected ShortFileProp array for the API
        const shortFileProps = files.map((file) => ({
          originalFileName: file.name,
          fileSize: file.size,
        }));

        // Validate files before uploading
        const error = validateFiles(shortFileProps, MAX_FILE_SIZE_NEXTJS_ROUTE);
        if (error) {
          toast({
            title: "Error uploading files",
            description: error,
          });
          return;
        }

        // Get presigned URLs from the API
        const presignedUrls =
          await getPresignedUrls.mutateAsync(shortFileProps);
        if ("error" in presignedUrls) {
          throw new Error(presignedUrls.error);
        }

        // Upload files using presigned URLs
        await handleUpload(files, presignedUrls, () => {
          toast({
            title: "Files uploaded successfully",
          });
          setFiles([]); // Clear files after successful upload
        });

        // reload
        window.location.reload();
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fileList = e.target.files;
    if (fileList) {
      setFiles(Array.from(fileList));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload file</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload file</DialogTitle>
          <DialogDescription>
            Upload a file here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="upload-media">Media</Label>
            <Input
              id="upload-media"
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              multiple
              disabled={loading}
              onChange={handleFileChange}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={files.length < 1 || loading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
