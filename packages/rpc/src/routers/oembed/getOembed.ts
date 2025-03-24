import {} from "@aws-sdk/client-sts";
import { TRPCError } from "@trpc/server";
import { object, string } from "zod";
import { publicProcedure } from "../../trpc";
import getMetadata from "./helpers/getMetadata";

export const getOembed = publicProcedure
  .input(object({ url: string().url() }))
  .query(async ({ input }) => {
    try {
      const { url } = input;
      return await getMetadata(url);
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
