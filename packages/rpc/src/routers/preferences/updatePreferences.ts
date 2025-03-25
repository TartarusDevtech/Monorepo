import prisma from "@hey/db/prisma/db/client";
import { TRPCError } from "@trpc/server";
import { boolean, number, object } from "zod";
import rateLimiter from "../../middlewares/rateLimiter";
import { authedProcedure } from "../../procedures/authedProcedure";

export const updatePreferences = authedProcedure
  .use(rateLimiter({ requests: 50 }))
  .input(
    object({
      appIcon: number().optional(),
      includeLowScore: boolean().optional()
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const preference = await prisma.preference.upsert({
        create: { ...input, accountAddress: ctx.account as string },
        update: input,
        where: { accountAddress: ctx.account as string }
      });

      return preference;
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
