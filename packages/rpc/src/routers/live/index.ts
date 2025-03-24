import { router } from "../../trpc";
import { createLive } from "./createLive";

export const liveRouter = router({
  create: createLive
});

export type LiveRouter = typeof liveRouter;
