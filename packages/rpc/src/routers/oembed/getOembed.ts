import {} from "@aws-sdk/client-sts";
import { TRPCError } from "@trpc/server";
import { object, string } from "zod";
import { CACHE_AGE_1_DAY } from "../../helpers/constants";
import rateLimiter from "../../middlewares/rateLimiter";
import { publicProcedure } from "../../trpc";
import getMetadata from "./helpers/getMetadata";

export const getOembed = publicProcedure
  .use(rateLimiter({ requests: 500 }))
  .input(object({ url: string().url() }))
  .query(async ({ input, ctx }) => {
    try {
      const { url } = input;

      ctx.res.setHeader("Cache-Control", CACHE_AGE_1_DAY);
      return await getMetadata(url);
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
