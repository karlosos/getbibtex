import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { citationsRouter } from "./routers/citations";
import { statsRouter } from "./routers/stats";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  citations: citationsRouter,
  stats: statsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
