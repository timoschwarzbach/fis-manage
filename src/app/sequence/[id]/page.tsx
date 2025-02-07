import { SequenceForm } from "./form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <div>
      My Post: {id} <SequenceForm />
    </div>
  );
}
