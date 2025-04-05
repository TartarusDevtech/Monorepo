import type { inferRouterOutputs } from "@trpc/server";
import { router } from "../../../trpc";
import { assignPermission } from "./assignPermission";

export const permissionsRouter = router({
  assign: assignPermission
});

export type PermissionsRouter = typeof permissionsRouter;
export type PermissionsRouterOutput = inferRouterOutputs<PermissionsRouter>;
