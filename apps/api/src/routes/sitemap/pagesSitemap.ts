import { Errors } from "@hey/data/errors";
import type { Context } from "hono";
import { create } from "xmlbuilder2";

const urls = [
  { path: "/", priority: "1" },
  { path: "/terms", priority: "1" },
  { path: "/privacy", priority: "1" },
  { path: "/guidelines", priority: "1" },
  { path: "/support", priority: "1" }
];

const pagesSitemap = async (ctx: Context) => {
  try {
    const sitemap = create({ version: "1.0", encoding: "UTF-8" }).ele(
      "urlset",
      {
        xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
        "xmlns:news": "http://www.google.com/schemas/sitemap-news/0.9",
        "xmlns:xhtml": "http://www.w3.org/1999/xhtml",
        "xmlns:mobile": "http://www.google.com/schemas/sitemap-mobile/1.0",
        "xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1",
        "xmlns:video": "http://www.google.com/schemas/sitemap-video/1.1"
      }
    );

    for (const page of urls) {
      sitemap
        .ele("url")
        .ele("loc")
        .txt(`https://hey.xyz${page.path}`)
        .up()
        .ele("lastmod")
        .txt(new Date().toISOString())
        .up()
        .ele("changefreq")
        .txt("weekly")
        .up()
        .ele("priority")
        .txt(page.priority)
        .up();
    }

    ctx.header("Content-Type", "application/xml");
    return ctx.body(sitemap.end({ prettyPrint: true }));
  } catch {
    return ctx.body(Errors.SomethingWentWrong);
  }
};

export default pagesSitemap;
