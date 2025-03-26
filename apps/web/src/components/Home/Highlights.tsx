import SinglePost from "@/components/Post/SinglePost";
import PostsShimmer from "@/components/Shared/Shimmer/PostsShimmer";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import {
  PageSize,
  type TimelineHighlightsRequest,
  useTimelineHighlightsQuery
} from "@hey/indexer";
import { Card, EmptyState, ErrorMessage } from "@hey/ui";
import { Virtuoso } from "react-virtuoso";

const Highlights = () => {
  const { currentAccount } = useAccountStore();

  const request: TimelineHighlightsRequest = {
    pageSize: PageSize.Fifty,
    account: currentAccount?.address
  };

  const { data, error, fetchMore, loading } = useTimelineHighlightsQuery({
    variables: { request }
  });

  const posts = data?.timelineHighlights.items;
  const pageInfo = data?.timelineHighlights.pageInfo;
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

  if (posts?.length === 0) {
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
            post={item}
          />
        )}
        useWindowScroll
      />
    </Card>
  );
};

export default Highlights;
