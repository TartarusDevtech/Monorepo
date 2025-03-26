import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { CACHE_AGE_1_DAY } from "../../helpers/constants";
import rateLimiter from "../../middlewares/rateLimiter";
import { publicProcedure } from "../../trpc";
import getMetadata from "./helpers/getMetadata";

const ParamsSchema = z.object({
  url: z.string().url()
});

const ResponseSchema = z
  .object({
    description: z.string().nullable(),
    favicon: z.string(),
    html: z.string().nullable(),
    image: z.string().nullable(),
    site: z.string().nullable(),
    title: z.string().nullable(),
    url: z.string().url()
  })
  .nullable();

export const getOembed = publicProcedure
  .use(rateLimiter({ requests: 500 }))
  .input(ParamsSchema)
  .output(ResponseSchema)
  .query(async ({ input, ctx }) => {
    try {
      const { url } = input;

      ctx.res.setHeader("Cache-Control", CACHE_AGE_1_DAY);
      return await getMetadata(url);
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
