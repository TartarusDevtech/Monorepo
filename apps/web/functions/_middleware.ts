export const onRequest: any = async (context: any) => {
  const { request } = context;
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";
  const url = new URL(request.url);
  const path = url.pathname;

  const isBot =
    /(bot|telegram|baidu|bing|yandex|iframely|whatsapp|facebook)/.test(
      userAgent
    );

  if (isBot) {
    if (path.startsWith("/u/") || path.startsWith("/posts/")) {
      const target = `https://og.hey.xyz${path}`;
      return fetch(target, {
        headers: request.headers,
        method: request.method,
        body: request.body,
        redirect: "follow"
      });
    }
  }

  return context.next();
};
