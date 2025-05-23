import { PrismaClient } from "@prisma/client";

import { env } from "~/env";
import { envFileOrEnv } from "~/env";

const createPrismaClient = () =>
  new PrismaClient({
    datasourceUrl: envFileOrEnv(env.DATABASE_URL_FILE as string | undefined, env.DATABASE_URL as string | undefined),
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
