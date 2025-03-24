import { PermissionId } from "@hey/data/permissions";
import prisma from "@hey/db/prisma/db/client";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../trpc";

const getRandomPicks = (
  data: { accountAddress: string }[]
): { accountAddress: string }[] => {
  const random = data.sort(() => Math.random() - Math.random());
  return random.slice(0, 150);
};

export const getStaffPicks = publicProcedure.query(async () => {
  try {
    const accountPermission = await prisma.accountPermission.findMany({
      select: { accountAddress: true },
      where: { enabled: true, permissionId: PermissionId.StaffPick }
    });

    return getRandomPicks(accountPermission);
  } catch {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
});
