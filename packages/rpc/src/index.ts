import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import "dotenv/config";
import { createContext } from "./context";
import { accountRouter } from "./routers/account";
import { healthRouter } from "./routers/health";
import { internalRouter } from "./routers/internal";
import { liveRouter } from "./routers/lens";
import { lensRouter } from "./routers/live";
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
  lens: lensRouter,
  misc: miscRouter,
  oembed: oembedRouter,
  preferences: preferencesRouter,
  staffPicks: staffPicksRouter
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  createContext: createContext as any,
  middleware: cors(),
  router: appRouter
});

server.listen(4784);
