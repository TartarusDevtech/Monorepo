import { Access } from "@hey/data/features";
import { TRPCError } from "@trpc/server";
import { type Address, getAddress } from "viem";
import { t } from "../trpc";

export const creatorToolsAccess = t.middleware(async (opts) => {
  const { account } = opts.ctx;

  const hasCreatorToolsAccess = Access["creator-tools"]
    .map((account) => getAddress(account))
    .includes(getAddress(account as Address));

  if (!hasCreatorToolsAccess) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({ ctx: { ...opts.ctx, account } });
});
