import { type Sequence } from "@prisma/client";
import { env } from "~/env";
import { type Slide } from "~/lib/types";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type tagesschauSequence = {
  id: string;
  active: boolean;
  category: string;
  locations: string[];
  aspects: string[];
  slides: Slide[];
  createdAt: string;
}

export const servicesRouter = createTRPCRouter({
  getTagesschau: publicProcedure.query(async () => {
    try {
      if (!env.TAGESSCHAU_SERVICE_URL) {
        throw new Error("TAGESSCHAU_SERVICE_URL not set");
      }
      const res = await fetch(env.TAGESSCHAU_SERVICE_URL).catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch tagesschau API");
      });

      const tagesschauSequences: tagesschauSequence[] = await res.json() as tagesschauSequence[];
      const now = new Date();
      return tagesschauSequences.map((sequence) => {
        return {
          ...sequence,
          createdAt: new Date(sequence.createdAt),
          lastUpdated: now
        }
      }) as Sequence[]
    } catch (e) {
      console.error(e);
      return [] as Sequence[];
    }
  }),
});
