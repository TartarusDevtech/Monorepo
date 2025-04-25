import { serve } from "@hono/node-server";
import "dotenv/config";
import { Hono } from "hono";
import tokenContext from "./context/tokenContext";
import cors from "./middlewares/cors";
import originLogger from "./middlewares/originLogger";
import accountRouter from "./routes/account";
import internalRouter from "./routes/internal";
import lensRouter from "./routes/lens";
import liveRouter from "./routes/live";
import metadataRouter from "./routes/metadata";
import oembedRouter from "./routes/oembed";
import ogRouter from "./routes/og";
import ping from "./routes/ping";
import preferencesRouter from "./routes/preferences";
import sitemapRouter from "./routes/sitemap";

const app = new Hono();

// Context
app.use(cors);
app.use(tokenContext);
app.use(originLogger);

// Routes
app.get("/ping", ping);
app.route("/lens", lensRouter);
app.route("/account", accountRouter);
app.route("/internal", internalRouter);
app.route("/live", liveRouter);
app.route("/metadata", metadataRouter);
app.route("/oembed", oembedRouter);
app.route("/preferences", preferencesRouter);
app.route("/sitemap", sitemapRouter);
app.route("/og", ogRouter);

serve({ fetch: app.fetch, port: 4784 }, (info) => {
  console.info(`Server running on port ${info.port}`);
});
