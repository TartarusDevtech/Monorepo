import type { inferRouterOutputs } from "@trpc/server";
import { router } from "../../trpc";
import { getStaffPicks } from "./getStaffPicks";

export const staffPicksRouter = router({
  get: getStaffPicks
});

export type StaffPicksRouter = typeof staffPicksRouter;
export type StaffPicksRouterOutput = inferRouterOutputs<StaffPicksRouter>;
