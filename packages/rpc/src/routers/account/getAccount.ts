import { PermissionId } from "@hey/data/permissions";
import { Regex } from "@hey/data/regex";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import rateLimiter from "../../middlewares/rateLimiter";
import { publicProcedure } from "../../trpc";

const ParamsSchema = z.object({
  address: z.string().regex(Regex.evmAddress)
});

const ResponseSchema = z.object({
  isSuspended: z.boolean()
});

export const getAccount = publicProcedure
  .use(rateLimiter({ requests: 250 }))
  .input(ParamsSchema)
  .output(ResponseSchema)
  .query(async ({ ctx, input }) => {
    try {
      const { address } = input;
      const accountPermission = await ctx.prisma.accountPermission.findFirst({
        where: {
          permissionId: PermissionId.Suspended,
          accountAddress: address
        }
      });

      return {
        isSuspended: accountPermission?.permissionId === PermissionId.Suspended
      };
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
