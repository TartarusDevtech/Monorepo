import { router } from "../../trpc";
import { getAccount } from "./getAccount";
import { permissionsRouter } from "./permissions";

export const internalRouter = router({
  account: getAccount,
  permissions: permissionsRouter
});

export type InternalRouter = typeof internalRouter;
