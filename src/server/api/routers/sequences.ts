import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const sequencesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.sequence.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
  }),
  getActive: publicProcedure.query(async ({ ctx }) => {
    const sequences = await ctx.db.sequence.findMany({
      where: {
        active: true,
      },
    })
    return await Promise.all(sequences.map(async (sequence) => JSON.parse(sequence.displayJSON ?? "")))
  }),
  getFromId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.db.sequence.findFirst({
      where: {
        id: input,
      }
    })
  }),
  createOrUpdate: publicProcedure.input(z.object({
    id: z.string().optional(),
    active: z.boolean(),
    locations: z.array(z.string()),
    category: z.string(),
    displayJSON: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const existing = await ctx.db.sequence.findFirst({ where: { id: input.id } })
    if (existing && input.id) {
      return await ctx.db.sequence.update({
        where: { id: input.id },
        data: input
      })
    } else {
      return await ctx.db.sequence.create({
        data: input
      })
    }
  })
});
