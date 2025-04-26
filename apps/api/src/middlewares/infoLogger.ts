import type { Context, HonoRequest, Next } from "hono";

const getIp = (req: HonoRequest) =>
  req.header("x-forwarded-for") || req.header("remote-addr") || "unknown";

const infoLogger = async (c: Context, next: Next) => {
  const start = performance.now();
  const startMem = process.memoryUsage().heapUsed;

  const source =
    c.req.header("Origin") || c.req.header("User-Agent") || "unknown";
  const ip = getIp(c.req);

  await next();

  const end = performance.now();
  const endMem = process.memoryUsage().heapUsed;

  const timeTakenMs = (end - start).toFixed(2);
  const memoryUsedMb = ((endMem - startMem) / 1024 / 1024).toFixed(2);

  console.info(
    `[${c.req.method}] ➜ [${source}] with ip [${ip}] ➜ [${c.req.path}] ➜ ${timeTakenMs}ms, ${memoryUsedMb}mb`
  );
};

export default infoLogger;
