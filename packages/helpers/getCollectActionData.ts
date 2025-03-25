import type {
  RecipientPercent,
  SimpleCollectActionFragment
} from "@hey/indexer";

const getCollectActionData = (
  collectAction: SimpleCollectActionFragment
): {
  amount?: number;
  assetAddress?: string;
  assetDecimals?: number;
  assetSymbol?: string;
  collectLimit?: number;
  endsAt?: string;
  recipients?: RecipientPercent[];
} | null => {
  switch (collectAction.__typename) {
    case "SimpleCollectAction":
      return {
        amount: Number.parseFloat(
          collectAction.payToCollect?.amount?.value || "0"
        ),
        assetAddress:
          collectAction.payToCollect?.amount?.asset?.contract?.address,
        assetDecimals: collectAction.payToCollect?.amount?.asset?.decimals,
        assetSymbol: collectAction.payToCollect?.amount?.asset?.symbol,
        collectLimit: Number(collectAction.collectLimit),
        endsAt: collectAction.endsAt,
        recipients: collectAction.payToCollect?.recipients || []
      };
    default:
      return null;
  }
};

export default getCollectActionData;
