interface Context {
  request: Request;
  next: () => Promise<Response>;
}

export const onRequest = async (context: Context) => {
  const { request } = context;
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";
  const url = new URL(request.url);
  const path = url.pathname;

  const isBot =
    /bot|telegram|baidu|bing|yandex|iframely|whatsapp|babbar|bytedance|facebook/.test(
      userAgent
    );

  if (path === "/sitemap.xml" || path === "" || path.startsWith("/sitemap/")) {
    let targetUrl: string;

    if (!path || path === "/sitemap.xml") {
      targetUrl = "https://api.hey.xyz/sitemap/all.xml";
    } else {
      const actualPath = path.replace("/sitemap/", "/");
      targetUrl = `https://api.hey.xyz/sitemap${actualPath}`;
    }

    return fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body
    });
  }

  if (
    isBot &&
    (path.startsWith("/u/") ||
      path.startsWith("/posts/") ||
      path.startsWith("/g/"))
  ) {
    return fetch(`https://og.hey.xyz${path}`, {
      headers: request.headers,
      method: request.method,
      body: request.body,
      redirect: "follow"
    });
  }

  return context.next();
};
