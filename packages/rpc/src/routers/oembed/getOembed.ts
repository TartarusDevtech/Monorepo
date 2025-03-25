import {} from "@aws-sdk/client-sts";
import { CACHE_AGE_1_DAY } from "../../helpers/constants";
import { TRPCError } from "@trpc/server";
import { object, string } from "zod";
import { publicProcedure } from "../../trpc";
import getMetadata from "./helpers/getMetadata";

export const getOembed = publicProcedure
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
