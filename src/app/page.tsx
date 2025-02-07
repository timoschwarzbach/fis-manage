import Link from "next/link";
import { Pill } from "~/components/ui/pill";

export default function HomePage() {
  return (
    <div className="flex flex-row flex-wrap items-stretch gap-4 p-4">
      <SequenceItem />
      <SequenceItem />
      <SequenceItem />
      <SequenceItem />
      <SequenceItem />
      <SequenceItem />
    </div>
  );
}

function SequenceItem() {
  return (
    <Link href={"/sequence/0"}>
      <div className="flex w-96 flex-col gap-4 rounded-lg p-2 pb-20 transition hover:bg-neutral-100">
        <div className="aspect-video w-full rounded bg-neutral-300" />
        <div className="flex flex-row flex-wrap gap-2">
          <Pill>16:9</Pill>
          <Pill>4:3</Pill>
          <Pill>8 sec</Pill>
          <Pill>2 Slides</Pill>
          <Pill>Conditional location</Pill>
        </div>
      </div>
    </Link>
  );
}
