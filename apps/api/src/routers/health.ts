import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const ResponseSchema = z.object({
  ping: z.string()
});

export const healthRouter = router({
  health: publicProcedure.output(ResponseSchema).query(() => {
    return { ping: "pong" };
  })
});

export type HealthRouter = typeof healthRouter;
