import { LENS_NAMESPACE } from "@hey/data/constants";
import { Regex } from "@hey/data/regex";
import type { AccountFragment } from "@hey/indexer";
import formatAddress from "./formatAddress";
import isAccountDeleted from "./isAccountDeleted";

const sanitizeDisplayName = (name?: null | string): null | string => {
  if (!name) {
    return null;
  }

  return name.replace(Regex.accountNameFilter, " ").trim().replace(/\s+/g, " ");
};

const getAccount = (
  account?: AccountFragment
): {
  name: string;
  link: string;
  username: string;
  usernameWithPrefix: string;
} => {
  if (!account) {
    return {
      name: "...",
      link: "",
      username: "...",
      usernameWithPrefix: "..."
    };
  }

  if (isAccountDeleted(account)) {
    return {
      name: "Deleted Account",
      link: "",
      username: "deleted",
      usernameWithPrefix: "@deleted"
    };
  }

  const { username, address } = account;

  const usernameValue = username?.value;
  const localName = username?.localName;

  const usernamePrefix = username ? "@" : "#";
  const usernameValueOrAddress =
    (usernameValue?.includes(LENS_NAMESPACE) ? localName : usernameValue) ||
    formatAddress(address);

  const link =
    username && usernameValue.includes(LENS_NAMESPACE)
      ? `/u/${localName}`
      : `/account/${address}`;

  return {
    name: sanitizeDisplayName(account.metadata?.name) || usernameValueOrAddress,
    link,
    username: usernameValueOrAddress,
    usernameWithPrefix: `${usernamePrefix}${usernameValueOrAddress}`
  };
};

export default getAccount;
