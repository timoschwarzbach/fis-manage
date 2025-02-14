import { type File } from "@prisma/client";
import Image from "next/image";
import { api } from "~/trpc/server";
import { UploadFile } from "./upload";
import { createPresignedUrlToDownload } from "~/lib/server/minio";
import { Pill } from "~/components/ui/pill";

export default async function MediaPage() {
  const files = await api.files.getAll();
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex w-full flex-row items-center justify-between">
        <span>{files.length} files</span>
        <UploadFile />
      </div>
      <div className="flex flex-row flex-wrap items-stretch gap-4">
        {files.length === 0 && <div>No files uploaded yet</div>}
        {files.map((file) => (
          <MediaItem key={file.id} file={file} />
        ))}
        <UploadFileAsItem />
      </div>
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
    <div className="flex w-96 flex-col gap-4 rounded-lg p-2 pb-4 transition hover:bg-neutral-100">
      <div className="aspect-video w-full overflow-hidden rounded bg-neutral-300">
        <Image
          className="h-full w-full object-contain"
          src={url ?? defaulturl}
          alt={file.fileName ?? "Uploaded image"}
          width={400}
          height={300}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {file.originalName && (
          <Pill>
            {file.originalName.length > 26
              ? `${file.originalName.slice(0, 10)} . . . ${file.originalName.slice(-13)}`
              : file.originalName}
          </Pill>
        )}
        {file.size && <Pill>{bytesToHumanReadable(file.size)}</Pill>}
      </div>
    </div>
  );
}

function bytesToHumanReadable(bytes: number) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  const i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);
  return `${(bytes / Math.pow(1024, i)).toFixed(0)} ${sizes[i]}`;
}

function UploadFileAsItem() {
  return (
    <div className="flex w-96 flex-col gap-4 rounded-lg p-2 pb-4 transition hover:bg-neutral-100">
      <div className="aspect-video w-full overflow-hidden rounded bg-neutral-300">
        + Icon here
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        <UploadFile />
      </div>
    </div>
  );
}
