import { Sequence } from "@prisma/client";
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

type SequenceItem = {
  aspects: string[];
  location: {
    type: string;
    stations?: string[];
  };
  slides: {
    background?: string;
    bottom?: {
      visible?: boolean;
      background?: boolean;
      title?: string;
      description?: string;
    };
    duration?: number;
  }[];
};

function SequenceItem({ sequence }: { sequence: Sequence }) {
  if (!sequence.json) return <>invalid sequence</>;
  const data = JSON.parse(sequence.json) as SequenceItem; // good enough for now
  return (
    <Link href={`/sequence/${sequence.id}`}>
      <div className="flex w-96 flex-col gap-4 rounded-lg p-2 pb-20 transition hover:bg-neutral-100">
        <Media id={data.slides[0]?.background ?? ""} />
        <div className="flex flex-row flex-wrap gap-2">
          {sequence.active && <Pill>Active</Pill>}
          {data.aspects.map((aspect) => (
            <Pill key={"aspect-" + aspect}>{aspect}</Pill>
          ))}
          {data.slides.length > 0 && (
            <Pill>
              {data.slides.length}{" "}
              {data.slides.length === 1 ? "Slide" : "Slides"}
            </Pill>
          )}
          {data.location.stations && <Pill>Conditional location</Pill>}
        </div>
      </div>
    </Link>
  );
}
