import { File } from "@prisma/client";
import Image from "next/image";
import { api } from "~/trpc/server";
import { UploadFile } from "./upload";
import { createPresignedUrlToDownload } from "~/lib/server/minio";

export default async function MediaPage() {
  const files = await api.files.getAll();
  return (
    <div className="flex flex-row flex-wrap items-stretch gap-4 p-4">
      <UploadFile />
      {files.length === 0 && <div>No files uploaded yet</div>}
      {files.map((file) => (
        <MediaItem key={file.id} file={file} />
      ))}
    </div>
  );
}

const defaulturl =
  "https://th.bing.com/th/id/OIP.WOki_Ng83gsk1xioaX3BPgHaG8?w=203&h=190&c=7&pcl=1b1a19&r=0&o=5&dpr=1.8&pid=1.7";

async function MediaItem({ file }: { file: File }) {
  if (!file.bucket || !file.fileName) {
    console.log("invalid file", file);
    return <>invalid file</>;
  }
  const url = await createPresignedUrlToDownload({
    bucketName: file.bucket,
    fileName: file.fileName,
  });

  return (
    <div className="flex w-96 flex-col gap-4 rounded-lg p-2 pb-20 transition hover:bg-neutral-100">
      <div className="aspect-video w-full rounded bg-neutral-300">
        <img
          src={url ?? defaulturl}
          alt={file.fileName ?? "Uploaded image"}
          width={400}
          height={300}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-2">something something</div>
    </div>
  );
}
