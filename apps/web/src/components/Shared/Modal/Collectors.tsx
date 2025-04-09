import SingleAccount from "@/components/Shared/Account/SingleAccount";
import AccountListShimmer from "@/components/Shared/Shimmer/AccountListShimmer";
import { EmptyState, ErrorMessage } from "@/components/Shared/UI";
import cn from "@/helpers/cn";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { accountsList } from "@/variants";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import {
  type WhoExecutedActionOnPostRequest,
  useWhoExecutedActionOnPostQuery
} from "@hey/indexer";
import { LazyMotion, domAnimation } from "motion/react";
import * as m from "motion/react-m";
import { Virtuoso } from "react-virtuoso";

interface CollectorsProps {
  postId: string;
}

const Collectors = ({ postId }: CollectorsProps) => {
  const { currentAccount } = useAccountStore();

  const request: WhoExecutedActionOnPostRequest = {
    post: postId,
    filter: { anyOf: [{ simpleCollect: true }] }
  };

  const { data, error, fetchMore, loading } = useWhoExecutedActionOnPostQuery({
    skip: !postId,
    variables: { request }
  });

  const accounts = data?.whoExecutedActionOnPost?.items;
  const pageInfo = data?.whoExecutedActionOnPost?.pageInfo;
  const hasMore = pageInfo?.next;

  const onEndReached = async () => {
    if (hasMore) {
      await fetchMore({
        variables: { request: { ...request, cursor: pageInfo?.next } }
      });
    }
  };

  if (loading) {
    return <AccountListShimmer />;
  }

  if (!accounts?.length) {
    return (
      <div className="p-5">
        <EmptyState
          icon={<ShoppingBagIcon className="size-8" />}
          message="No collectors."
          hideCard
        />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        className="m-5"
        error={error}
        title="Failed to load collectors"
      />
    );
  }

  return (
    <Virtuoso
      className="!h-[80vh]"
      data={accounts}
      endReached={onEndReached}
      itemContent={(index, action) => (
        <LazyMotion features={domAnimation}>
          <m.div
            className={cn(
              "divider p-5",
              index === accounts.slice(5).length - 1 && "border-b-0"
            )}
            variants={accountsList}
            initial="hidden"
            animate="visible"
          >
            <SingleAccount
              hideFollowButton={
                currentAccount?.address === action.account.address
              }
              hideUnfollowButton={
                currentAccount?.address === action.account.address
              }
              account={action.account}
              showBio
              showUserPreview={false}
            />
          </m.div>
        </LazyMotion>
      )}
    />
  );
};

export default Collectors;
