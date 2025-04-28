import { HEY_TREASURY } from "@hey/data/constants";

const injectReferrerToUrl = (url: string, param = "referrer") => {
  const parsedUrl = new URL(url);
  parsedUrl.searchParams.set(param, HEY_TREASURY);
  return parsedUrl.toString();
};

export default injectReferrerToUrl;
