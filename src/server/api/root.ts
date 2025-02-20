import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { filesRouter } from "~/server/api/routers/files";
import { sequencesRouter } from "./routers/sequences";
import { servicesRouter } from "./routers/service";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  files: filesRouter,
  sequences: sequencesRouter,
  services: servicesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
