import { useAccountStore } from "@/store/persisted/useAccountStore";
import {
  DEFAULT_COLLECT_TOKEN,
  IS_MAINNET,
  NATIVE_TOKEN_SYMBOL,
  STATIC_IMAGES_URL,
  WRAPPED_NATIVE_TOKEN_SYMBOL
} from "@hey/data/constants";
import { Image } from "@hey/ui";
import { formatUnits } from "viem";
import { useBalance } from "wagmi";
import Loader from "../../Loader";
import Fund from "./Fund";

const FundAccount = () => {
  const { currentAccount } = useAccountStore();

  const { data, isLoading } = useBalance({
    address: currentAccount?.address,
    token: DEFAULT_COLLECT_TOKEN,
    query: { refetchInterval: 2000 }
  });

  if (isLoading) {
    return <Loader message="Loading balance..." className="my-10" />;
  }

  const accountBalance = data
    ? Number.parseFloat(formatUnits(data.value, 18)).toFixed(2)
    : 0;

  return (
    <div className="m-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <Image
          className="size-12 rounded-full"
          src={`${STATIC_IMAGES_URL}/tokens/${
            IS_MAINNET ? "gho.svg" : "grass.svg"
          }`}
          alt={WRAPPED_NATIVE_TOKEN_SYMBOL}
        />
        <div className="font-bold text-2xl">
          {accountBalance} {WRAPPED_NATIVE_TOKEN_SYMBOL}
        </div>
        <div className="ld-text-gray-500 text-sm">
          Wrapped {NATIVE_TOKEN_SYMBOL} enables various Hey-specific actions.
        </div>
      </div>
      <Fund />
    </div>
  );
};

export default FundAccount;
