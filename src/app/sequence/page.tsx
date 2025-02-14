import { type Sequence } from "@prisma/client";
import Link from "next/link";
import { Pill } from "~/components/ui/pill";
import { api } from "~/trpc/server";
import { Media } from "~/components/media";

export default async function HomePage() {
  const sequences = await api.sequences.getAll();
  return (
    <div className="flex flex-row flex-wrap items-stretch gap-4 p-4">
      {sequences.map((sequence) => (
        <SequenceItem key={sequence.id} sequence={sequence} />
      ))}
    </div>
  );
}

type Slides = {
  background?: string;
  bottom?: {
    visible?: boolean;
    background?: boolean;
    title?: string;
    description?: string;
  };
  duration?: number;
}[];

function SequenceItem({ sequence }: { sequence: Sequence }) {
  if (!sequence.slides) return <>invalid sequence</>;
  const slides = JSON.parse(sequence.slides) as Slides; // good enough for now
  return (
    <Link href={`/sequence/${sequence.id}`}>
      <div className="flex w-96 flex-col gap-4 rounded-lg p-2 pb-20 transition hover:bg-neutral-100">
        <Media id={slides[0]?.background ?? ""} />
        <div className="flex flex-row flex-wrap gap-2">
          {sequence.active && <Pill>Active</Pill>}
          {sequence.aspects.map((aspect) => (
            <Pill key={"aspect-" + aspect}>{aspect}</Pill>
          ))}
          {slides.length > 0 && (
            <Pill>
              {slides.length} {slides.length === 1 ? "Slide" : "Slides"}
            </Pill>
          )}
          {sequence.locations.length > 0 && <Pill>Conditional location</Pill>}
        </div>
      </div>
    </Link>
  );
}
