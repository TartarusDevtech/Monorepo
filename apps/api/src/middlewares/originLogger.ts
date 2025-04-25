import type { Context, HonoRequest, Next } from "hono";

const getIp = (req: HonoRequest) =>
  req.header("x-forwarded-for") || req.header("remote-addr") || "unknown";

const originLogger = async (c: Context, next: Next) => {
  const source =
    c.req.header("Origin") || c.req.header("User-Agent") || "unknown";
  const ip = getIp(c.req);
  console.info(
    `[${c.req.method}] ➜ [${source}] with ip [${ip}] ➜ [${c.req.path}]`
  );
  await next();
};

export default originLogger;
