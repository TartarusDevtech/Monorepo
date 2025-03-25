import prisma from "@hey/db/prisma/db/client";
import { TRPCError } from "@trpc/server";
import { staffAccess } from "../../../middlewares/staffAccess";
import { authedProcedure } from "../../../procedures/authedProcedure";

export const getPermissions = authedProcedure
  .use(staffAccess)
  .query(async () => {
    try {
      const permissions = await prisma.permission.findMany({
        include: { _count: { select: { accounts: true } } },
        orderBy: { accounts: { _count: "desc" } }
      });

      return permissions;
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
