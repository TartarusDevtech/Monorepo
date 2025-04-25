import {
  AVATAR_BIG,
  LENS_API_URL,
  STATIC_IMAGES_URL
} from "@hey/data/constants";
import { default as getAccountData } from "@hey/helpers/getAccount";
import getAvatar from "@hey/helpers/getAvatar";
import { AccountDocument } from "@hey/indexer";
import { print } from "graphql";
import type { Context } from "hono";
import { html } from "hono/html";
import defaultMetadata from "src/utils/defaultMetadata";
import { generateLongExpiry, getRedis, setRedis } from "src/utils/redis";

const getAccount = async (ctx: Context) => {
  try {
    const { username } = ctx.req.param();

    const cacheKey = `og:account:${username}`;
    const cachedAccount = await getRedis(cacheKey);

    if (cachedAccount) {
      return ctx.html(cachedAccount, 200);
    }

    const res = await fetch(LENS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: print(AccountDocument),
        variables: { request: { username: { localName: username } } }
      })
    });

    const { data } = await res.json();

    if (!data.account) {
      return ctx.html(defaultMetadata, 404);
    }

    const account = data.account;
    const { name, link, usernameWithPrefix } = getAccountData(account);
    const title = `${name} (${usernameWithPrefix}) • Hey`;
    const description = (account?.metadata?.bio || title).slice(0, 155);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `https://hey.xyz/u/${username}`,
      name,
      alternateName: username,
      description,
      image: getAvatar(account, AVATAR_BIG),
      url: `https://hey.xyz/u/${username}`
    };

    const ogHtml = html`
      <html>
        <head>
          <link rel="canonical" href="https://hey.xyz${link}" />
          <meta name="description" content="${description}" />
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:type" content="profile" />
          <meta property="og:site_name" content="Hey" />
          <meta property="og:url" content="https://hey.xyz${link}" />
          <meta property="og:image" content="${getAvatar(account, AVATAR_BIG)}" />
          <meta property="og:logo" content="${STATIC_IMAGES_URL}/app-icon/0.png" />
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
    await setRedis(cacheKey, cleanHtml, generateLongExpiry());

    return ctx.html(cleanHtml, 200);
  } catch {
    return ctx.html(defaultMetadata, 500);
  }
};

export default getAccount;
