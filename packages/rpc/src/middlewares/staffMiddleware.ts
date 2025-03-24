import { Access } from "@hey/data/features";
import { TRPCError } from "@trpc/server";
import { type Address, getAddress } from "viem";
import { t } from "../trpc";

export const staffMiddleware = t.middleware(async (opts) => {
  const { account } = opts.ctx;

  const isStaff = Access["staff"]
    .map((account) => getAddress(account))
    .includes(getAddress(account as Address));

  if (!isStaff) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({ ctx: { ...opts.ctx, account } });
});
