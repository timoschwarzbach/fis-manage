"use client";

import { api } from "~/trpc/react";
import { SequenceItem } from "./item";
import { Skeleton } from "~/components/ui/skeleton";
import { CreateSequence } from "./create";

export default function SequencePage() {
  const sequenceQuery = api.sequences.getAll.useQuery();
  const sequences = sequenceQuery.data;
  if (!sequences) {
    return (
      <div className="flex flex-row flex-wrap items-stretch gap-4 p-4">
        <Skeleton className="aspect-video w-96 pb-12" />
        <Skeleton className="aspect-video w-96 pb-12" />
        <Skeleton className="aspect-video w-96 pb-12" />
      </div>
    );
  }
  return (
    <div className="flex flex-row flex-wrap items-stretch gap-4 p-4">
      {sequences.map((sequence) => (
        <SequenceItem key={sequence.id} sequence={sequence} />
      ))}
      <CreateSequence />
    </div>
  );
}
