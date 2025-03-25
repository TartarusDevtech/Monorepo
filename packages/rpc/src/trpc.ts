import {
  createTRPCStoreLimiter,
  defaultFingerPrint
} from "@trpc-limiter/memory";
import { initTRPC } from "@trpc/server";
import type { Context } from "./context";

export const t = initTRPC.context<Context>().create();

export const router = t.router;

const rateLimiter = createTRPCStoreLimiter<typeof t>({
  fingerprint: (ctx) => defaultFingerPrint(ctx.req),
  message: (hitInfo) => `Too many requests, please try again later. ${hitInfo}`,
  max: 15,
  windowMs: 10000
});

export const publicProcedure = t.procedure;
