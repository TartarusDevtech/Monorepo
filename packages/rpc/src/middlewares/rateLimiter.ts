import {
  createTRPCStoreLimiter,
  defaultFingerPrint
} from "@trpc-limiter/memory";
import type { t } from "../trpc";

type RateLimiterOptions = {
  requests: number;
};

const rateLimiter = ({ requests }: RateLimiterOptions) =>
  createTRPCStoreLimiter<typeof t>({
    fingerprint: (ctx) => defaultFingerPrint(ctx.req),
    message: (hitInfo) =>
      `Too many requests, please try again later. ${hitInfo}`,
    max: requests,
    windowMs: 10000
  });

export default rateLimiter;
