import { api } from "~/trpc/server";
import { SequenceItem } from "./item";

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
