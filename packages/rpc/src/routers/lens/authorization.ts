import { PermissionId } from "@hey/data/permissions";
import { Regex } from "@hey/data/regex";
import prisma from "@hey/db/prisma/db/client";
import { TRPCError } from "@trpc/server";
import { object, string } from "zod";
import { publicProcedure } from "../../trpc";

export const authorization = publicProcedure
  .input(object({ account: string().regex(Regex.evmAddress) }))
  .mutation(async ({ input }) => {
    try {
      const { account } = input;
      const accountPermission = await prisma.accountPermission.findFirst({
        where: {
          permissionId: PermissionId.Suspended,
          accountAddress: account
        }
      });

      return { allowed: true, sponsored: !accountPermission?.enabled };
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
