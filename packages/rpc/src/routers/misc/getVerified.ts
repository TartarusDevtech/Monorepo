import { PermissionId } from "@hey/data/permissions";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { CACHE_AGE_30_MINS } from "../../helpers/constants";
import rateLimiter from "../../middlewares/rateLimiter";
import { publicProcedure } from "../../trpc";

const ResponseSchema = z.array(z.string());

export const getVerified = publicProcedure
  .use(rateLimiter({ requests: 250 }))
  .output(ResponseSchema)
  .query(async ({ ctx }) => {
    try {
      const verifiedAccounts = await ctx.prisma.accountPermission.findMany({
        select: { accountAddress: true },
        where: { enabled: true, permissionId: PermissionId.Verified }
      });

      ctx.res.setHeader("Cache-Control", CACHE_AGE_30_MINS);
      return verifiedAccounts.map(({ accountAddress }) => accountAddress);
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
