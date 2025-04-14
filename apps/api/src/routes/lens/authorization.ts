import type { Context } from "hono";
import { CACHE_AGE_1_DAY, VERIFICATION_ENDPOINT } from "src/utils/constants";

const authorization = async (ctx: Context) => {
  ctx.header("Cache-Control", CACHE_AGE_1_DAY);
  return ctx.json({
    allowed: true,
    sponsored: true,
    appVerificationEndpoint: VERIFICATION_ENDPOINT
  });
};

export default authorization;
