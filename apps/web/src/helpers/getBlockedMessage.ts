import getAccount from "@hey/helpers/getAccount";
import type { AccountFragment } from "@hey/indexer";

export const getBlockedByMeMessage = (account: AccountFragment): string => {
  const { usernameWithPrefix } = getAccount(account);

  return `You have blocked ${usernameWithPrefix}`;
};

export const getBlockedMeMessage = (account: AccountFragment): string => {
  const { usernameWithPrefix } = getAccount(account);

  return `${usernameWithPrefix} has blocked you`;
};
