import { router } from "../../trpc";
import { creatorToolsRouter } from "./creatorTools";
import { getAccount } from "./getAccount";
import { permissionsRouter } from "./permissions";

export const internalRouter = router({
  account: getAccount,
  creatorTools: creatorToolsRouter,
  permissions: permissionsRouter
});

export type InternalRouter = typeof internalRouter;
