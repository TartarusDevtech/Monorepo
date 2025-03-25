import { Regex } from "@hey/data/regex";
import prisma from "@hey/db/prisma/db/client";
import { TRPCError } from "@trpc/server";
import { object, string } from "zod";
import { staffAccess } from "../../middlewares/staffAccess";
import { authedProcedure } from "../../procedures/authedProcedure";

export const getAccount = authedProcedure
  .use(staffAccess)
  .input(object({ address: string().regex(Regex.evmAddress) }))
  .query(async ({ input }) => {
    try {
      const { address } = input;

      const [preference, permissions] = await prisma.$transaction([
        prisma.preference.findUnique({
          where: { accountAddress: address }
        }),
        prisma.accountPermission.findMany({
          include: { permission: { select: { key: true } } },
          where: { enabled: true, accountAddress: address }
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
