"use client";

import { api } from "~/trpc/react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";

export function Media({ id, type }: { id: string; type?: "image" | "video" }) {
  const fileQuery = api.files.urlFromId.useQuery(id);

  if (fileQuery.isLoading) {
    return <Skeleton className="aspect-video w-full" />;
  }

  if (
    fileQuery.data?.url &&
    (fileQuery.data.type.includes("image") || type === "image")
  ) {
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

  if (
    fileQuery.data?.url &&
    (fileQuery.data.type.includes("video") || type === "video")
  ) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    return (
      <video
        className="aspect-video w-full object-contain"
        src={fileQuery.data.url}
        controls={false}
        autoPlay={!prefersReducedMotion}
        loop={true}
        width={400}
        height={300}
      />
    );
  }

  return <div className="aspect-video w-full rounded bg-neutral-300" />;
}

export function ExternalMedia({
  bucketName = "fis",
  fileName,
  type = "image",
}: {
  bucketName: string;
  fileName: string;
  type: "image" | "video";
}) {
  const fileQuery = api.files.urlFromName.useQuery({ bucketName, fileName });

  if (fileQuery.isLoading) {
    return <Skeleton className="aspect-video w-full" />;
  }

  if (fileQuery.data && type === "image") {
    return (
      <Image
        className="aspect-video w-full object-contain"
        src={fileQuery.data}
        alt="Uploaded image"
        width={400}
        height={300}
      />
    );
  }

  if (fileQuery.data && type === "video") {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    return (
      <video
        className="aspect-video w-full object-contain"
        src={fileQuery.data}
        controls={false}
        autoPlay={!prefersReducedMotion}
        loop={true}
        width={400}
        height={300}
      />
    );
  }

  return <div className="aspect-video w-full rounded bg-neutral-300" />;
}
