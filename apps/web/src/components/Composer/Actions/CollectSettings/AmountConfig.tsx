import ToggleWithHelper from "@/components/Shared/ToggleWithHelper";
import { useCollectActionStore } from "@/store/non-persisted/post/useCollectActionStore";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { DEFAULT_COLLECT_TOKEN, STATIC_IMAGES_URL } from "@hey/data/constants";
import { tokens } from "@hey/data/tokens";
import type { CollectActionType } from "@hey/types/hey";
import { Input, Select } from "@hey/ui";

interface AmountConfigProps {
  setCollectType: (data: CollectActionType) => void;
}

const AmountConfig = ({ setCollectType }: AmountConfigProps) => {
  const { currentAccount } = useAccountStore();
  const { collectAction } = useCollectActionStore((state) => state);

  const enabled = Boolean(collectAction.payToCollect?.amount.value);

  return (
    <div>
      <ToggleWithHelper
        description="Get paid whenever someone collects your post"
        heading="Charge for collecting"
        icon={<CurrencyDollarIcon className="size-5" />}
        on={enabled}
        setOn={() => {
          setCollectType({
            payToCollect: enabled
              ? undefined
              : {
                  amount: { currency: DEFAULT_COLLECT_TOKEN, value: "1" },
                  referralShare: 5, // 5% for the Hey platform fees
                  recipients: [
                    { address: currentAccount?.address, percent: 100 }
                  ]
                }
          });
        }}
      />
      {collectAction.payToCollect?.amount.value ? (
        <div className="mt-4 ml-8">
          <div className="flex space-x-2 text-sm">
            <Input
              label="Price"
              max="100000"
              min="0"
              onChange={(event) => {
                if (!collectAction.payToCollect) return;
                setCollectType({
                  payToCollect: {
                    ...collectAction.payToCollect,
                    amount: {
                      currency: collectAction.payToCollect?.amount.currency,
                      value: event.target.value ? event.target.value : "0"
                    }
                  }
                });
              }}
              placeholder="0.5"
              type="number"
              value={Number.parseFloat(
                collectAction.payToCollect?.amount.value
              )}
            />
            <div className="w-5/6">
              <div className="label">Select currency</div>
              <Select
                iconClassName="size-4"
                onChange={(value) => {
                  if (!collectAction.payToCollect) return;
                  setCollectType({
                    payToCollect: {
                      ...collectAction.payToCollect,
                      amount: {
                        currency: value,
                        value: collectAction.payToCollect?.amount
                          .value as string
                      }
                    }
                  });
                }}
                options={tokens.map((token) => ({
                  icon: `${STATIC_IMAGES_URL}/tokens/${token.symbol}.svg`,
                  label: token.name,
                  selected:
                    token.contractAddress ===
                    collectAction.payToCollect?.amount.currency,
                  value: token.contractAddress
                }))}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AmountConfig;
