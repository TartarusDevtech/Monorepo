import SinglePost from "@/components/Post/SinglePost";
import PostsShimmer from "@/components/Shared/Shimmer/PostsShimmer";
import { Card, EmptyState, ErrorMessage } from "@/components/Shared/UI";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import {
  PageSize,
  type TimelineHighlightsRequest,
  useTimelineHighlightsQuery
} from "@hey/indexer";
import { useRef } from "react";
import {
  type StateSnapshot,
  Virtuoso,
  type VirtuosoHandle
} from "react-virtuoso";

let virtuosoState: any = { ranges: [], screenTop: 0 };

const Highlights = () => {
  const { currentAccount } = useAccountStore();
  const virtuoso = useRef<VirtuosoHandle>(null);

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

  const onScrolling = (scrolling: boolean) => {
    if (!scrolling) {
      virtuoso?.current?.getState((state: StateSnapshot) => {
        virtuosoState = { ...state };
      });
    }
  };

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
        isScrolling={onScrolling}
        itemContent={(index, item) => (
          <SinglePost
            isFirst={index === 0}
            isLast={index === (posts?.length || 0) - 1}
            post={item}
          />
        )}
        ref={virtuoso}
        restoreStateFrom={
          virtuosoState.ranges.length
            ? virtuosoState
            : virtuosoState?.current?.getState((state: StateSnapshot) => state)
        }
        useWindowScroll
      />
    </Card>
  );
};

export default Highlights;
