"use client";

import { api } from "~/trpc/react";
import { Skeleton } from "~/components/ui/skeleton";
import { ExternalMedia } from "~/components/media";
import { Card } from "~/components/ui/card";
import { Pill } from "~/components/ui/pill";
import { Button } from "~/components/ui/button";
import { type Sequence } from "@prisma/client";
import { type Slide } from "~/lib/types";

export default function TagesschauPage() {
  const tagesschauQuery = api.services.getSequence.useQuery("tagesschau");
  const posts = tagesschauQuery.data;
  if (!posts) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <div className="flex w-full flex-row items-center justify-between">
          <span>Loading posts</span>
        </div>
        <div className="flex flex-row flex-wrap items-stretch gap-4">
          <Skeleton className="mb-20 flex aspect-video w-96 items-center justify-center" />
          <Skeleton className="mb-20 flex aspect-video w-96 items-center justify-center" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex w-full flex-row items-center justify-between rounded-xl border p-3 shadow-sm">
        <div className="flex flex-col items-start">
          <span>Tagesschau</span>
          <Pill variant="outline">todo: status</Pill>
        </div>
        <div className="flex flex-col items-end">
          <Button variant="outline">Refresh</Button>
          <span>Content refreshes every 10 minutes</span>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-stretch gap-4">
        {posts.map((post) => (
          <TagesschauItem item={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}

const TagesschauItem = ({ item }: { item: Sequence }) => {
  const news = (item.slides as Slide[])[1];

  if (!news) {
    return <>empty</>;
  }

  return (
    <div className="group relative flex w-96 flex-col gap-4 pb-8">
      <Card className="aspect-video w-full overflow-hidden">
        <ExternalMedia
          bucketName="tagesschau"
          fileName={item.id}
          type="image"
        />
      </Card>
      <div className="flex flex-row flex-wrap gap-2">
        <Pill>{news.title}</Pill>
        {news.description}
      </div>
    </div>
  );
};
