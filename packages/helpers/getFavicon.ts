const getFavicon = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return `https://external-content.duckduckgo.com/ip3/${hostname || "unknowndomain"}.ico`;
  } catch {
    return "https://external-content.duckduckgo.com/ip3/unknowndomain.ico";
  }
};

export default getFavicon;
