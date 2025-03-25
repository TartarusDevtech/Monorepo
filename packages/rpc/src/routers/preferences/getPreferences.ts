import prisma from "@hey/db/prisma/db/client";
import { TRPCError } from "@trpc/server";
import rateLimiter from "../../middlewares/rateLimiter";
import { authedProcedure } from "../../procedures/authedProcedure";

export const getPreferences = authedProcedure
  .use(rateLimiter({ requests: 100 }))
  .query(async ({ ctx }) => {
    try {
      const [preference, permissions] = await prisma.$transaction([
        prisma.preference.findUnique({
          where: { accountAddress: ctx.account as string }
        }),
        prisma.accountPermission.findMany({
          include: { permission: { select: { key: true } } },
          where: { enabled: true, accountAddress: ctx.account as string }
        })
      ]);

      return {
        appIcon: preference?.appIcon || 0,
        includeLowScore: Boolean(preference?.includeLowScore),
        permissions: permissions.map(({ permission }) => permission.key)
      };
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
