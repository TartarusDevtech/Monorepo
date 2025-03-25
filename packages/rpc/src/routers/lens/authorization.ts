import { PermissionId } from "@hey/data/permissions";
import { Regex } from "@hey/data/regex";
import prisma from "@hey/db/prisma/db/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { VERIFICATION_ENDPOINT } from "../../helpers/constants";
import { publicProcedure } from "../../trpc";

const ParamsSchema = z.object({
  account: z.string().regex(Regex.evmAddress)
});

const ResponseSchema = z.object({
  allowed: z.boolean(),
  sponsored: z.boolean(),
  appVerificationEndpoint: z.string()
});

export const authorization = publicProcedure
  .input(ParamsSchema)
  .output(ResponseSchema)
  .mutation(async ({ input }) => {
    try {
      const { account } = input;
      const suspended = await prisma.accountPermission.findFirst({
        where: {
          permissionId: PermissionId.Suspended,
          accountAddress: account
        }
      });

      return {
        allowed: true,
        sponsored: !suspended?.enabled,
        appVerificationEndpoint: VERIFICATION_ENDPOINT
      };
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
