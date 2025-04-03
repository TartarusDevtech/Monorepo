import SinglePost from "@/components/Post/SinglePost";
import PostsShimmer from "@/components/Shared/Shimmer/PostsShimmer";
import { Card, EmptyState, ErrorMessage } from "@/components/Shared/UI";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import {
  PageSize,
  type PostsForYouRequest,
  usePostsForYouQuery
} from "@hey/indexer";
import { Virtuoso } from "react-virtuoso";

const ForYou = () => {
  const { currentAccount } = useAccountStore();

  const request: PostsForYouRequest = {
    pageSize: PageSize.Fifty,
    account: currentAccount?.address,
    shuffle: true
  };

  const { data, error, fetchMore, loading } = usePostsForYouQuery({
    variables: { request }
  });

  const posts = data?.mlPostsForYou.items;
  const pageInfo = data?.mlPostsForYou.pageInfo;
  const hasMore = pageInfo?.next;

  const onEndReached = async () => {
    if (hasMore) {
      await fetchMore({
        variables: { request: { ...request, cursor: pageInfo?.next } }
      });
    }
  };

  if (loading) {
    return <PostsShimmer />;
  }

  if (!posts?.length) {
    return (
      <EmptyState
        icon={<LightBulbIcon className="size-8" />}
        message="No posts yet!"
      />
    );
  }

  if (error) {
    return <ErrorMessage error={error} title="Failed to load highlights" />;
  }

  return (
    <Card>
      <Virtuoso
        className="virtual-divider-list-window"
        data={posts}
        endReached={onEndReached}
        itemContent={(index, item) => (
          <SinglePost
            isFirst={index === 0}
            isLast={index === (posts?.length || 0) - 1}
            post={item.post}
          />
        )}
        useWindowScroll
      />
    </Card>
  );
};

export default ForYou;
