import { type Sequence } from "@prisma/client";
import Link from "next/link";
import { Pill } from "~/components/ui/pill";
import { Media } from "~/components/media";
import { Card } from "~/components/ui/card";
import { DeleteSequenceButton } from "./delete";
import { type Slide } from "~/lib/types";

export function SequenceItem({ sequence }: { sequence: Sequence }) {
  if (!sequence.slides) return <>invalid sequence</>;
  const slides = sequence.slides as Slide[]; // good enough for now
  return (
    <div className="group relative w-96">
      <Link
        href={`/sequence/${sequence.id}`}
        className="flex flex-col gap-4 pb-8"
      >
        <Card className="aspect-video w-full overflow-hidden">
          <Media id={slides[0]?.backgroundMediaId ?? ""} />
        </Card>
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
      </Link>
      <DeleteSequenceButton sequence={sequence} />
    </div>
  );
}
