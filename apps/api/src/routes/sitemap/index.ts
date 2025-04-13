import { Hono } from "hono";
import allSitemap from "./allSitemap";
import pagesSitemap from "./pagesSitemap";
import profileSitemap from "./profiles/profileSitemap";
import profilesSitemap from "./profiles/profilesSitemap";

const app = new Hono();

app.get("/all.xml", allSitemap);
app.get("/pages.xml", pagesSitemap);
app.get("/profiles.xml", profilesSitemap);
app.get("/profiles/:offset.xml", profileSitemap);

export default app;
