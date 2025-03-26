import { PermissionId } from "@hey/data/permissions";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { CACHE_AGE_30_MINS } from "../../helpers/constants";
import rateLimiter from "../../middlewares/rateLimiter";
import { publicProcedure } from "../../trpc";

const ResponseSchema = z.array(z.object({ accountAddress: z.string() }));

const getRandomPicks = (
  data: { accountAddress: string }[]
): { accountAddress: string }[] => {
  const random = data.sort(() => Math.random() - Math.random());
  return random.slice(0, 150);
};

export const getStaffPicks = publicProcedure
  .use(rateLimiter({ requests: 100 }))
  .output(ResponseSchema)
  .query(async ({ ctx }) => {
    try {
      const accountPermission = await ctx.prisma.accountPermission.findMany({
        select: { accountAddress: true },
        where: { enabled: true, permissionId: PermissionId.StaffPick }
      });

      ctx.res.setHeader("Cache-Control", CACHE_AGE_30_MINS);
      return getRandomPicks(accountPermission);
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
