import { router } from "../../trpc";
import { authorization } from "./authorization";
import { verification } from "./verification";

export const lensRouter = router({
  authorization,
  verification
});

export type LensRouter = typeof lensRouter;
