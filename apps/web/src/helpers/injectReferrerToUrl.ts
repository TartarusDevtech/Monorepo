import { HEY_TREASURY } from "@hey/data/constants";

const DOMAIN_PARAM_MAP: Record<string, { name: string; value: string }> = {
  "zora.co": { name: "referrer", value: HEY_TREASURY },
  "highlight.xyz": { name: "referrer", value: HEY_TREASURY }
};

const injectReferrerToUrl = (url: string) => {
  const parsedUrl = new URL(url);
  const param = DOMAIN_PARAM_MAP[parsedUrl.hostname];

  if (!param) {
    return url;
  }

  parsedUrl.searchParams.set(param.name, param.value);
  return parsedUrl.toString();
};

export default injectReferrerToUrl;
