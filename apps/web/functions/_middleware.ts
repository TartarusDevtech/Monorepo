export const onRequest: any = async (context: any) => {
  const { request } = context;
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";
  const url = new URL(request.url);
  const path = url.pathname;

  const isBot =
    /bot|telegram|baidu|bing|yandex|iframely|whatsapp|facebook/.test(userAgent);

  if (path === "/sitemap.xml" || path === "" || path.startsWith("/sitemap/")) {
    let targetUrl: string;

    if (!path || path === "/sitemap.xml") {
      targetUrl = "https://api.hey.xyz/sitemap/all.xml";
    } else {
      const actualPath = path.replace("/sitemap/", "/");
      targetUrl = `https://api.hey.xyz/sitemap${actualPath}`;
    }

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body
    });

    const newResponse = new Response(response.body, response);
    newResponse.headers.set("Cache-Control", "public, max-age=2592000");
    return newResponse;
  }

  if (
    isBot &&
    (path.startsWith("/u/") ||
      path.startsWith("/posts/") ||
      path.startsWith("/g/"))
  ) {
    const target = `https://og.hey.xyz${path}`;
    return fetch(target, {
      headers: request.headers,
      method: request.method,
      body: request.body,
      redirect: "follow"
    });
  }

  return context.next();
};
