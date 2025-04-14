import { Regex } from "@hey/data/regex";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import authorization from "./authorization";
import verification from "./verification";

const app = new Hono();

app.post(
  "/authorization",
  zValidator(
    "json",
    z.object({
      account: z.string().regex(Regex.evmAddress),
      signedBy: z.string().regex(Regex.evmAddress)
    })
  ),
  authorization
);

app.post(
  "/verification",
  zValidator(
    "json",
    z.object({
      nonce: z.string(),
      deadline: z.string(),
      operation: z.string(),
      validator: z.string().regex(Regex.evmAddress),
      account: z.string().regex(Regex.evmAddress)
    })
  ),
  verification
);

export default app;
