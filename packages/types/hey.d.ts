import type { AmountInput } from "@hey/indexer";

export type CollectActionType = {
  enabled?: boolean;
  amount?: AmountInput | null;
  recipients?: RecipientDataInput[];
  collectLimit?: null | number;
  followerOnly?: boolean;
  referralShare?: number;
  endsAt?: null | string;
};
