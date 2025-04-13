import { Hono } from "hono";
import pagesSitemap from "./pagesSitemap";
import profileSitemap from "./profiles/profileSitemap";
import profilesSitemapIndex from "./profiles/profilesSitemapIndex";
import sitemapIndex from "./sitemapIndex";

const app = new Hono();

app.get("/all.xml", sitemapIndex);
app.get("/pages.xml", pagesSitemap);
app.get("/profiles.xml", profilesSitemapIndex);
app.get("/profiles/:offset.xml", profileSitemap);

export default app;
