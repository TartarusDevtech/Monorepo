import { AVATAR_BIG } from "@hey/data/constants";
import getAccount from "@hey/helpers/getAccount";
import getAvatar from "@hey/helpers/getAvatar";
import { GroupDocument, type GroupFragment } from "@hey/indexer";
import apolloClient from "@hey/indexer/apollo/client";
import type { Context } from "hono";
import { html } from "hono/html";
import { CACHE_AGE_1_DAY } from "src/utils/constants";
import defaultMetadata from "src/utils/defaultMetadata";
import { getRedis, setRedis } from "src/utils/redis";

const getGroup = async (ctx: Context) => {
  try {
    const { address } = ctx.req.param();

    const cacheKey = `og:group:${address}`;
    const cachedGroup = await getRedis(cacheKey);

    if (cachedGroup) {
      return ctx.html(cachedGroup, 200);
    }

    const { data } = await apolloClient().query({
      query: GroupDocument,
      variables: { request: { group: address } }
    });

    if (!data.group) {
      return ctx.html(defaultMetadata, 404);
    }

    const group = data.group as GroupFragment;
    const title = `${group.metadata?.name || "Group"} • Hey`;
    const description = (group?.metadata?.description || title).slice(0, 155);
    const { usernameWithPrefix } = getAccount(group.owner);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `https://hey.xyz/g/${address}`,
      name: group.metadata?.name || "Group",
      alternateName: address,
      description,
      image: getAvatar(group, AVATAR_BIG),
      url: `https://hey.xyz/g/${address}`
    };

    const ogHtml = html`
      <html>
        <head>
          <link rel="canonical" href="https://hey.xyz/g/${group.address}" />
          <meta name="application-name" content="Hey" />
          <meta name="creator" content="${usernameWithPrefix}" />
          <meta name="publisher" content="${usernameWithPrefix}" />
          <meta name="description" content="${description}" />
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:type" content="profile" />
          <meta property="og:site_name" content="Hey" />
          <meta property="og:url" content="https://hey.xyz/g/${group.address}" />
          <meta property="og:image" content="${getAvatar(group, AVATAR_BIG)}" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@heydotxyz" />
          <title>${title}</title>
        </head>
        <body>
          <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
          <h1>${title}</h1>
          <h2>${description}</h2>
        </body>
      </html>
    `;

    const cleanHtml = ogHtml.toString().replace(/\n\s+/g, "").trim();
    await setRedis(cacheKey, cleanHtml);

    ctx.header("Cache-Control", CACHE_AGE_1_DAY);
    return ctx.html(cleanHtml, 200);
  } catch {
    return ctx.html(defaultMetadata, 500);
  }
};

export default getGroup;
