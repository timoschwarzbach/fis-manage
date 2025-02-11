"use client";

import { api } from "~/trpc/react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";

export function Media({ id }: { id: string }) {
  const fileQuery = api.files.getDownloadUrlFromId.useQuery(id);

  if (fileQuery.isLoading) {
    return <Skeleton className="aspect-video w-full" />;
  }

  if (fileQuery.data?.url && fileQuery.data.type === "image") {
    return (
      <Image
        className="h-full w-full rounded object-contain"
        src={fileQuery.data.url}
        alt="Uploaded image"
        width={400}
        height={300}
      />
    );
  }

  if (fileQuery.data?.url && fileQuery.data.type === "video") {
    return (
      <video
        className="h-full w-full rounded object-contain"
        controls={false}
        autoPlay={true}
        loop={true}
      />
    );
  }

  return <div className="aspect-video w-full rounded bg-neutral-300" />;
}
