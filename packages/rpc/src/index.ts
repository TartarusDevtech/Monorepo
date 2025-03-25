import logger from "@hey/helpers/logger";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { createContext } from "./context";
import { lensAuthorization } from "./http/lens/lensAuthorization";
import { lensVerification } from "./http/lens/lensVerification";
import { ping } from "./http/ping";
import { accountRouter } from "./routers/account";
import { healthRouter } from "./routers/health";
import { internalRouter } from "./routers/internal";
import { liveRouter } from "./routers/live";
import { miscRouter } from "./routers/misc";
import { oembedRouter } from "./routers/oembed";
import { preferencesRouter } from "./routers/preferences";
import { staffPicksRouter } from "./routers/staffPicks";
import { router } from "./trpc";

export const appRouter = router({
  account: accountRouter,
  health: healthRouter,
  internal: internalRouter,
  live: liveRouter,
  misc: miscRouter,
  oembed: oembedRouter,
  preferences: preferencesRouter,
  staffPicks: staffPicksRouter
});

export type AppRouter = typeof appRouter;

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
);

app.get("/ping", (_, res) => {
  ping(res);
});

app.post("/lens/authorization", (req, res) => {
  lensAuthorization(req, res);
});

app.post("/lens/verification", (req, res) => {
  lensVerification(req, res);
});

const PORT = 4784;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
