import { PermissionId } from "@hey/data/permissions";
import prisma from "@hey/db/prisma/db/client";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../trpc";

export const getVerified = publicProcedure.query(async () => {
  try {
    const verifiedAccounts = await prisma.accountPermission.findMany({
      select: { accountAddress: true },
      where: {
        enabled: true,
        permissionId: PermissionId.Verified
      }
    });

    return verifiedAccounts.map(({ accountAddress }) => accountAddress);
  } catch {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
});
