import { api } from "~/trpc/server";
import { SequenceForm } from "./form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const currentSequence = await api.sequences.getFromId(id);
  return (
    <div className="p-4">
      <span>sequence id: {id}</span>
      <SequenceForm sequence={currentSequence} />
    </div>
  );
}
