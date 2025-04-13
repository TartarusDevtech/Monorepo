import { Errors } from "@hey/data/errors";
import type { Context } from "hono";
import prisma from "src/prisma/client";
import { getRedis, setRedis } from "src/utils/redis";

const getPreferences = async (ctx: Context) => {
  try {
    const account = ctx.get("account");

    const cacheKey = `preferences:${account}`;
    const cachedValue = await getRedis(cacheKey);

    if (cachedValue) {
      return ctx.json({
        success: true,
        cached: true,
        data: JSON.parse(cachedValue)
      });
    }

    const [preference, permissions] = await prisma.$transaction([
      prisma.preference.findUnique({
        where: { accountAddress: account as string }
      }),
      prisma.accountPermission.findMany({
        include: { permission: { select: { key: true } } },
        where: { enabled: true, accountAddress: account as string }
      })
    ]);

    const data = {
      appIcon: preference?.appIcon || 0,
      includeLowScore: Boolean(preference?.includeLowScore),
      permissions: permissions.map(({ permission }) => permission.key)
    };

    await setRedis(cacheKey, JSON.stringify(data));

    return ctx.json({ success: true, data });
  } catch {
    return ctx.json({ success: false, error: Errors.SomethingWentWrong }, 500);
  }
};

export default getPreferences;
