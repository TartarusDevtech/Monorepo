import prisma from "@hey/db/prisma/db/client";
import parseJwt from "@hey/helpers/parseJwt";
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";

export const createContext = async ({ req, res }: CreateHTTPContextOptions) => {
  async function getFromHeader() {
    const token = (req.headers as any)["x-id-token"];

    const rest = { req, res, prisma };

    if (token) {
      const payload = parseJwt(token);
      return { ...rest, token, account: payload.act.sub };
    }

    return { ...rest, token: null, account: null };
  }

  return await getFromHeader();
};

export type Context = Awaited<ReturnType<typeof createContext>>;
