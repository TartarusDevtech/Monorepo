import { Errors } from "@hey/data/errors";
import type { Context } from "hono";
import { SITEMAP_BATCH_SIZE } from "src/utils/constants";
import lensPg from "src/utils/lensPg";
import { getRedis, hoursToSeconds, setRedis } from "src/utils/redis";
import { create } from "xmlbuilder2";

const accountSitemap = async (ctx: Context) => {
  const params = ctx.req.param();
  const batch = params["batch.xml"].replace(".xml", "");

  if (Number.isNaN(Number(batch))) {
    return ctx.body(Errors.SomethingWentWrong);
  }

  if (Number(batch) === 0) {
    return ctx.body(Errors.SomethingWentWrong);
  }

  try {
    const cacheKey = `sitemap:accounts:${batch}`;
    const cachedData = await getRedis(cacheKey);
    let usernames: string[];

    if (cachedData) {
      usernames = JSON.parse(cachedData);
    } else {
      const newUsernames = await lensPg.query(
        `
          SELECT local_name
          FROM account.username_assigned
          WHERE id > $1
          ORDER BY id
          LIMIT $2;
        `,
        [(Number(batch) - 1) * SITEMAP_BATCH_SIZE, SITEMAP_BATCH_SIZE]
      );

      usernames = newUsernames.map((username) => username.local_name);
      await setRedis(cacheKey, usernames, hoursToSeconds(50 * 24));
    }

    const sitemap = create({ version: "1.0", encoding: "UTF-8" }).ele(
      "urlset",
      { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" }
    );

    for (const username of usernames) {
      sitemap
        .ele("url")
        .ele("loc")
        .txt(`https://hey.xyz/u/${username}`)
        .up()
        .ele("lastmod")
        .txt(new Date().toISOString())
        .up();
    }

    ctx.header("Content-Type", "application/xml");
    return ctx.body(sitemap.end({ prettyPrint: true }));
  } catch {
    return ctx.body(Errors.SomethingWentWrong);
  }
};

export default accountSitemap;
