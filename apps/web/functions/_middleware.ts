export const onRequest: PagesFunction = async ({ request }) => {
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";
  const url = new URL(request.url);
  const path = url.pathname;

  const isBot =
    /(bot|telegram|baidu|bing|yandex|iframely|whatsapp|facebook)/.test(
      userAgent
    );

  if (isBot) {
    if (path.startsWith("/u/")) {
      return Response.redirect(`https://og.hey.xyz${path}`, 302);
    }

    if (path.startsWith("/posts/")) {
      return Response.redirect(`https://og.hey.xyz${path}`, 302);
    }
  }

  return await fetch(request);
};
