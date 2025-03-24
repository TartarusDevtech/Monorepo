import { publicProcedure, router } from "../trpc";

export const healthRouter = router({
  health: publicProcedure.query(() => {
    return { ping: "pong" };
  })
});

export type HealthRouter = typeof healthRouter;
