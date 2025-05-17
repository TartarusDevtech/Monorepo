import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import getJumperQuotes from "./getJumperQuotes";
import getJumperTips from "./getJumperTips";

const app = new Hono();

app.get(
  "/jumper/quotes/:id",
  zValidator("param", z.object({ id: z.string() })),
  getJumperQuotes
);
app.get(
  "/jumper/tips/:id",
  zValidator("param", z.object({ id: z.string() })),
  getJumperTips
);

export default app;
