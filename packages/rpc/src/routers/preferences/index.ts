import type { inferRouterOutputs } from "@trpc/server";
import { router } from "../../trpc";
import { getPreferences } from "./getPreferences";
import { updatePreferences } from "./updatePreferences";

export const preferencesRouter = router({
  get: getPreferences,
  update: updatePreferences
});

export type PreferencesRouter = typeof preferencesRouter;
export type PreferencesRouterOutput = inferRouterOutputs<PreferencesRouter>;
