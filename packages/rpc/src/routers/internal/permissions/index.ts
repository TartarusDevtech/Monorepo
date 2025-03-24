import type { inferRouterOutputs } from "@trpc/server";
import { router } from "../../../trpc";
import { assignPermission } from "./assignPermission";
import { getPermissions } from "./getPermissions";

export const permissionsRouter = router({
  all: getPermissions,
  assign: assignPermission
});

export type PermissionsRouter = typeof permissionsRouter;
export type PermissionsRouterOutput = inferRouterOutputs<PermissionsRouter>;
