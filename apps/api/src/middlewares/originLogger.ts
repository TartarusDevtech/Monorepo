import type { Context, HonoRequest, Next } from "hono";

const getIp = (req: HonoRequest) =>
  req.header("x-forwarded-for") || req.header("remote-addr") || "unknown";

const originLogger = async (c: Context, next: Next) => {
  const origin = c.req.header("Origin");
  const ua = c.req.header("User-Agent");
  const ip = getIp(c.req);
  console.info(
    `[${c.req.method}] ➜ [${origin ?? ua}] with ip [${ip}] ➜ [${c.req.path}]`
  );
  await next();
};

export default originLogger;
