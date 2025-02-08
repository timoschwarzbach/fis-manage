import { SequenceForm } from "./form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <div className="p-4">
      <span>sequence id: {id}</span>
      <SequenceForm />
    </div>
  );
}
