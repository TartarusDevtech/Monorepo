import prisma from "@hey/db/prisma/db/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import rateLimiter from "../../middlewares/rateLimiter";
import { authedProcedure } from "../../procedures/authedProcedure";

const ParamsSchema = z.object({
  appIcon: z.number().optional(),
  includeLowScore: z.boolean().optional()
});

const ResponseSchema = z.object({
  appIcon: z.number(),
  includeLowScore: z.boolean()
});

export const updatePreferences = authedProcedure
  .use(rateLimiter({ requests: 50 }))
  .input(ParamsSchema)
  .output(ResponseSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const preference = await prisma.preference.upsert({
        create: { ...input, accountAddress: ctx.account as string },
        update: input,
        where: { accountAddress: ctx.account as string }
      });

      return {
        appIcon: preference.appIcon ?? 0,
        includeLowScore: preference.includeLowScore ?? false
      };
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
