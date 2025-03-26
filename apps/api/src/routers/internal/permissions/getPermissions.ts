import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { staffAccess } from "../../../middlewares/staffAccess";
import { authedProcedure } from "../../../procedures/authedProcedure";

const ResponseSchema = z.array(
  z.object({
    _count: z.object({
      accounts: z.number()
    }),
    id: z.string(),
    key: z.string(),
    type: z.string(),
    createdAt: z.date()
  })
);

export const getPermissions = authedProcedure
  .use(staffAccess)
  .output(ResponseSchema)
  .query(async ({ ctx }) => {
    try {
      const permissions = await ctx.prisma.permission.findMany({
        include: { _count: { select: { accounts: true } } },
        orderBy: { accounts: { _count: "desc" } }
      });

      return permissions;
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
