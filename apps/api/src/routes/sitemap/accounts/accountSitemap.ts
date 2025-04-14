import { Errors } from "@hey/data/errors";
import type { Context } from "hono";
import { create } from "xmlbuilder2";

const accountSitemap = async (ctx: Context) => {
  try {
    const currentTime = new Date().toISOString();

    const usernames = ["yoginth", "hey", "stani", "paris", "wagmi", "lens"];

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

    for (const username of usernames) {
      sitemap
        .ele("url")
        .ele("loc")
        .txt(`https://hey.xyz/u/${username}`)
        .up()
        .ele("lastmod")
        .txt(currentTime)
        .up()
        .ele("changefreq")
        .txt("weekly")
        .up()
        .ele("priority")
        .txt("1")
        .up();
    }

    ctx.header("Content-Type", "application/xml");
    return ctx.body(sitemap.end({ prettyPrint: true }));
  } catch {
    return ctx.body(Errors.SomethingWentWrong);
  }
};

export default accountSitemap;
