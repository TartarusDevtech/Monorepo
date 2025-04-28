import { HEY_TREASURY } from "@hey/data/constants";

const DOMAIN_PARAM_MAP: Record<string, string> = {
  "zora.co": "referrer"
};

const injectReferrerToUrl = (url: string) => {
  const parsedUrl = new URL(url);
  const param = DOMAIN_PARAM_MAP[parsedUrl.hostname];

  if (!param) {
    return url;
  }

  parsedUrl.searchParams.set(param, HEY_TREASURY);
  return parsedUrl.toString();
};

export default injectReferrerToUrl;
