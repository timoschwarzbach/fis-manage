import { type Sequence } from "@prisma/client";
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
  getTagesschau: publicProcedure.query(async () => {
    try {
      const url = new URL(env.INTEGRATIONS_SERVICE_URL);
      url.pathname = "/tagesschau";
      const res = await fetch(url).catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch tagesschau API");
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
      console.error("reading sequences from tagesschau module failed", e);
      return [] as Sequence[];
    }
  }),
  getWeather: publicProcedure.query(async () => {
    try {
      const url = new URL(env.INTEGRATIONS_SERVICE_URL);
      url.pathname = "/weather";
      const res = await fetch(url).catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch weather API");
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
      console.error("reading sequences from weather module failed", e);
      return [] as Sequence[];
    }
  }),
});
