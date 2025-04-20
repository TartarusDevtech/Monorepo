import getAccount from "@hey/helpers/getAccount";
import type { AccountFragment } from "@hey/indexer";

export const getBlockedByMeMessage = (account: AccountFragment): string => {
  const { usernameWithPrefix } = getAccount(account);

  return `This account (${usernameWithPrefix}) is blocked by you`;
};
