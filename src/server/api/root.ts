import { createTRPCRouter } from "~/server/api/trpc";
import { hierarchyRouter } from "~/server/api/routers/hierarchy";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  hierarchy: hierarchyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
