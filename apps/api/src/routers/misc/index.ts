import { router } from "../../trpc";
import { getSTS } from "./getSTS";
import { getVerified } from "./getVerified";

export const miscRouter = router({
  sts: getSTS,
  verified: getVerified
});

export type MiscRouter = typeof miscRouter;
