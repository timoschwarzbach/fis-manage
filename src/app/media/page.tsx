"use client";

import { api } from "~/trpc/react";
import { UploadFile } from "./upload";
import { Card } from "~/components/ui/card";
import { MediaItem } from "./item";
import { Skeleton } from "~/components/ui/skeleton";

export default function MediaPage() {
  const fileQuery = api.files.getAll.useQuery();
  const files = fileQuery.data;
  if (!files) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <div className="flex w-full flex-row items-center justify-between">
          <span>Loading files</span>
          <UploadFile />
        </div>
        <div className="flex flex-row flex-wrap items-stretch gap-4">
          <Skeleton className="mb-20 flex aspect-video w-96 items-center justify-center" />
          <Skeleton className="mb-20 flex aspect-video w-96 items-center justify-center" />
          <UploadFileAsItem />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex w-full flex-row items-center justify-between">
        <span>{files.length} files</span>
        <UploadFile />
      </div>
      <div className="flex flex-row flex-wrap items-stretch gap-4">
        {files.map((file) => (
          <MediaItem key={file.id} file={file} />
        ))}
        <UploadFileAsItem />
      </div>
    </div>
  );
}

function UploadFileAsItem() {
  return (
    <Card className="mb-20 flex aspect-video w-96 items-center justify-center">
      <UploadFile />
    </Card>
  );
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
