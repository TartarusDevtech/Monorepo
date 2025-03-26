import type { inferRouterOutputs } from "@trpc/server";
import { router } from "../../trpc";
import { getOembed } from "./getOembed";

export const oembedRouter = router({
  get: getOembed
});

export type OembedRouter = typeof oembedRouter;
export type OembedRouterOutput = inferRouterOutputs<OembedRouter>;
