import parseJwt from "@hey/helpers/parseJwt";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createContext = async ({ req }: FetchCreateContextFnOptions) => {
  async function getFromHeader() {
    const token = (req.headers as any)["x-id-token"];

    if (token) {
      const payload = parseJwt(token);
      return { token, account: payload.act.sub };
    }

    return { token: null, account: null };
  }

  return await getFromHeader();
};

export type Context = Awaited<ReturnType<typeof createContext>>;
