import { PermissionId } from "@hey/data/permissions";
import prisma from "@hey/db/prisma/db/client";
import { TRPCError } from "@trpc/server";
import { CACHE_AGE_30_MINS } from "../../helpers/constants";
import { publicProcedure } from "../../trpc";

export const getVerified = publicProcedure.query(async ({ ctx }) => {
  try {
    const verifiedAccounts = await prisma.accountPermission.findMany({
      select: { accountAddress: true },
      where: {
        enabled: true,
        permissionId: PermissionId.Verified
      }
    });

    ctx.res.setHeader("Cache-Control", CACHE_AGE_30_MINS);
    return verifiedAccounts.map(({ accountAddress }) => accountAddress);
  } catch {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
});
