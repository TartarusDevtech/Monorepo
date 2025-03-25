import { useAccountQuery } from "@hey/indexer";
import type { Address } from "viem";
import SingleAccountShimmer from "./Shimmer/SingleAccountShimmer";
import SingleAccount from "./SingleAccount";
import WalletAccount from "./WalletAccount";

interface LazySingleAccountProps {
  address: Address;
}

const LazySingleAccount = ({ address }: LazySingleAccountProps) => {
  const { data, loading } = useAccountQuery({
    skip: !address,
    variables: { request: { address } }
  });

  if (loading) {
    return <SingleAccountShimmer />;
  }

  if (!data?.account) {
    return <WalletAccount address={address} />;
  }

  return (
    <SingleAccount hideFollowButton hideUnfollowButton account={data.account} />
  );
};

export default LazySingleAccount;
