import { api } from "~/trpc/server";

export async function GET(_request: Request) {
  const sequences = await api.sequences.getActive();
  return Response.json(sequences);
}