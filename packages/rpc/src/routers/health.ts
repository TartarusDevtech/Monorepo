import { publicProcedure, router } from "../trpc";

export const healthRouter = router({
  health: publicProcedure.query(({ ctx }) => {
    ctx.res.setHeader("Gm-Control-Allow-Origin", "*");
    return { ping: "pong" };
  })
});

export type HealthRouter = typeof healthRouter;
