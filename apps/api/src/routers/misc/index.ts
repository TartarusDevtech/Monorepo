import { router } from "../../trpc";
import { getSTS } from "./getSTS";

export const miscRouter = router({
  sts: getSTS
});

export type MiscRouter = typeof miscRouter;
