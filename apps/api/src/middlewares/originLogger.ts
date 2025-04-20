import type { Context, Next } from "hono";

const originLogger = async (c: Context, next: Next) => {
  const origin = c.req.header("Origin");
  const ua = c.req.header("User-Agent");
  console.info(
    `[${c.req.method}] method from [${origin ?? ua}] to [${c.req.path}]`
  );
  await next();
};

export default originLogger;
