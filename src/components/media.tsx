"use client";

import { api } from "~/trpc/react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";

export function Media({ id }: { id: string }) {
  const fileQuery = api.files.urlFromId.useQuery(id);

  if (fileQuery.isLoading) {
    return <Skeleton className="aspect-video w-full" />;
  }

  if (fileQuery.data?.url && fileQuery.data.type.includes("image")) {
    return (
      <Image
        className="aspect-video w-full object-contain"
        src={fileQuery.data.url}
        alt="Uploaded image"
        width={400}
        height={300}
      />
    );
  }

  if (fileQuery.data?.url && fileQuery.data.type.includes("video")) {
    return (
      <video
        className="aspect-video w-full object-contain"
        src={fileQuery.data.url}
        controls={true}
        autoPlay={true}
        loop={true}
        width={400}
        height={300}
      />
    );
  }

  return <div className="aspect-video w-full rounded bg-neutral-300" />;
}
