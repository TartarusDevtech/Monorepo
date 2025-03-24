import { router } from "../../trpc";
import { getAccount } from "./getAccount";

export const accountRouter = router({
  get: getAccount
});

export type AccountRouter = typeof accountRouter;
