import { LIVEPEER_KEY } from "@hey/data/constants";
import generateUUID from "@hey/helpers/generateUUID";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import rateLimiter from "../../middlewares/rateLimiter";
import { authedProcedure } from "../../procedures/authedProcedure";

const ParamsSchema = z.object({
  record: z.boolean()
});

const ResponseSchema = z.object({
  id: z.string(),
  playbackId: z.string(),
  streamKey: z.string()
});

export const createLive = authedProcedure
  .use(rateLimiter({ requests: 10 }))
  .input(ParamsSchema)
  .output(ResponseSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const { record } = input;

      const response = await fetch("https://livepeer.studio/api/stream", {
        body: JSON.stringify({
          name: `${ctx.account}-${generateUUID()}`,
          profiles: [
            {
              bitrate: 3000000,
              fps: 0,
              height: 720,
              name: "720p0",
              width: 1280
            },
            {
              bitrate: 6000000,
              fps: 0,
              height: 1080,
              name: "1080p0",
              width: 1920
            }
          ],
          record
        }),
        headers: {
          Authorization: `Bearer ${LIVEPEER_KEY}`,
          "content-type": "application/json"
        },
        method: "POST"
      });

      return (await response.json()) as {
        id: string;
        playbackId: string;
        streamKey: string;
      };
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
