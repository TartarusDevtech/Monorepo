import { TRPCError } from "@trpc/server";
import { z } from "zod";
import rateLimiter from "../../middlewares/rateLimiter";
import { authedProcedure } from "../../procedures/authedProcedure";

const ResponseSchema = z.object({
  appIcon: z.number(),
  includeLowScore: z.boolean(),
  permissions: z.array(z.string())
});

export const getPreferences = authedProcedure
  .use(rateLimiter({ requests: 100 }))
  .output(ResponseSchema)
  .query(async ({ ctx }) => {
    try {
      const [preference, permissions] = await ctx.prisma.$transaction([
        ctx.prisma.preference.findUnique({
          where: { accountAddress: ctx.account as string }
        }),
        ctx.prisma.accountPermission.findMany({
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
