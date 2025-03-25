import { Errors } from "@hey/data/errors";
import { PermissionId } from "@hey/data/permissions";
import prisma from "@hey/db/prisma/db/client";
import type { Request, Response } from "express";
import { VERIFICATION_ENDPOINT } from "../../helpers/constants";

export const lensAuthorization = async (req: Request, res: Response) => {
  const { account } = req.body;

  try {
    const suspended = await prisma.accountPermission.findFirst({
      where: {
        permissionId: PermissionId.Suspended,
        accountAddress: account
      }
    });

    return res.json({
      allowed: true,
      sponsored: !suspended?.enabled,
      appVerificationEndpoint: VERIFICATION_ENDPOINT
    });
  } catch {
    return res.json({ error: Errors.SomethingWentWrong });
  }
};
