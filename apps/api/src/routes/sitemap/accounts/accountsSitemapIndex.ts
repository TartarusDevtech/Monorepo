import { Errors } from "@hey/data/errors";
import type { Context } from "hono";
import lensPg from "src/utils/lensPg";
import { getRedis, setRedis } from "src/utils/redis";
import { create } from "xmlbuilder2";

const accountsSitemapIndex = async (ctx: Context) => {
  try {
    const cacheKey = "sitemap:accounts:total";
    const cachedData = await getRedis(cacheKey);
    let totalHandles: number;

    if (cachedData) {
      totalHandles = Number(cachedData);
    } else {
      const handles = await lensPg.query(`
        SELECT CEIL(COUNT(*) / 50000) AS count
        FROM account.username_assigned;
      `);

      totalHandles = Number(handles[0]?.count) || 0;
      await setRedis(cacheKey, totalHandles);
    }

    const sitemaps = Array.from({ length: totalHandles }, (_, index) => ({
      path: `/sitemap/accounts/${index + 1}.xml`,
      priority: "1"
    }));

    const sitemapIndex = create({ version: "1.0", encoding: "UTF-8" }).ele(
      "sitemapindex",
      { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" }
    );

    for (const sitemap of sitemaps) {
      sitemapIndex
        .ele("sitemap")
        .ele("loc")
        .txt(`https://hey.xyz${sitemap.path}`)
        .up()
        .ele("lastmod")
        .txt(new Date().toISOString())
        .up();
    }

    ctx.header("Content-Type", "application/xml");
    return ctx.body(sitemapIndex.end({ prettyPrint: true }));
  } catch {
    return ctx.body(Errors.SomethingWentWrong);
  }
};

export default accountsSitemapIndex;
