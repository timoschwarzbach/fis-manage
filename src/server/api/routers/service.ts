import { type Sequence } from "@prisma/client";
import { z } from "zod";
import { env } from "~/env";
import { type Slide } from "~/lib/types";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type apiSequence = {
  id: string;
  active: boolean;
  category: string;
  locations: string[];
  aspects: string[];
  slides: Slide[];
  createdAt: string;
  lastUpdated: string;
}

export const servicesRouter = createTRPCRouter({
  getSequence: publicProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const url = new URL(env.INTEGRATIONS_SERVICE_URL);
      url.pathname = `/${input}`;
      const res = await fetch(url).catch((error) => {
        console.error(error);
        throw new Error(`Failed to fetch ${input} API`);
      });

      const sequences = await res.json() as apiSequence[];
      return sequences.map((sequence) => {
        return {
          ...sequence,
          createdAt: new Date(sequence.createdAt),
          lastUpdated: new Date(sequence.lastUpdated),
        }
      }) as Sequence[]
    } catch (e) {
      console.error(`reading sequences from ${input} module failed`, e);
      return [] as Sequence[];
    }
  }),
});
