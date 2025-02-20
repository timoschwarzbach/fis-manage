import { type Sequence } from "@prisma/client";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type tagesschauSequence = {
  id: string;
  thumbnail: string;
  topline: string;
  headline: string;
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
          id: sequence.id,
          createdAt: now,
          lastUpdated: now,
          active: true,
          category: "tagesschau",
          locations: [],
          aspects: [],
          slides: JSON.stringify([{
            background: sequence.id, bottom: {
              visible: true,
              background: true,
              title: sequence.topline,
              description: sequence.headline,
            }
          }]),
        }
      }) as Sequence[]
    } catch (e) {
      console.error(e);
      return [] as Sequence[];
    }
  }),
});
