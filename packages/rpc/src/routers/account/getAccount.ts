import { PermissionId } from "@hey/data/permissions";
import { Regex } from "@hey/data/regex";
import prisma from "@hey/db/prisma/db/client";
import { TRPCError } from "@trpc/server";
import { object, string } from "zod";
import { publicProcedure } from "../../trpc";

export const getAccount = publicProcedure
  .input(object({ address: string().regex(Regex.evmAddress) }))
  .query(async ({ input }) => {
    try {
      const { address } = input;
      const [accountPermission] = await prisma.$transaction([
        prisma.accountPermission.findFirst({
          where: {
            permissionId: PermissionId.Suspended,
            accountAddress: address
          }
        })
      ]);

      return {
        isSuspended: accountPermission?.permissionId === PermissionId.Suspended
      };
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
