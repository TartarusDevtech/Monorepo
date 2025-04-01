import AccountListShimmer from "@/components/Shared/Shimmer/AccountListShimmer";
import SingleAccount from "@/components/Shared/SingleAccount";
import { EmptyState, ErrorMessage } from "@/components/Shared/UI";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import {
  PageSize,
  PostReferenceType,
  type WhoReferencedPostRequest,
  useWhoReferencedPostQuery
} from "@hey/indexer";
import { Virtuoso } from "react-virtuoso";

interface RepostsProps {
  postId: string;
}

const Reposts = ({ postId }: RepostsProps) => {
  const { currentAccount } = useAccountStore();

  const request: WhoReferencedPostRequest = {
    pageSize: PageSize.Fifty,
    post: postId,
    referenceTypes: [PostReferenceType.RepostOf]
  };

  const { data, error, fetchMore, loading } = useWhoReferencedPostQuery({
    skip: !postId,
    variables: { request }
  });

  const accounts = data?.whoReferencedPost?.items;
  const pageInfo = data?.whoReferencedPost?.pageInfo;
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
          icon={<ArrowsRightLeftIcon className="size-8" />}
          message="No reposts."
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
        title="Failed to load reposts"
      />
    );
  }

  return (
    <Virtuoso
      className="virtual-account-list"
      data={accounts}
      endReached={onEndReached}
      itemContent={(_, account) => (
        <div className="p-5">
          <SingleAccount
            hideFollowButton={currentAccount?.address === account.address}
            hideUnfollowButton={currentAccount?.address === account.address}
            account={account}
            showBio
            showUserPreview={false}
          />
        </div>
      )}
    />
  );
};

export default Reposts;
