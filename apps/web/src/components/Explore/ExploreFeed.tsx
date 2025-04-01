import SinglePost from "@/components/Post/SinglePost";
import PostsShimmer from "@/components/Shared/Shimmer/PostsShimmer";
import { Card, EmptyState, ErrorMessage } from "@/components/Shared/UI";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import {
  type MlexplorePostsRequest,
  PageSize,
  useMlPostsExploreQuery
} from "@hey/indexer";
import { useRef } from "react";
import type { StateSnapshot, VirtuosoHandle } from "react-virtuoso";
import { Virtuoso } from "react-virtuoso";

let virtuosoState: any = { ranges: [], screenTop: 0 };

interface ExploreFeedProps {
  feedType?: any;
  focus?: any;
}

const ExploreFeed = ({ feedType = "", focus }: ExploreFeedProps) => {
  const virtuoso = useRef<VirtuosoHandle>(null);

  const request: MlexplorePostsRequest = {
    pageSize: PageSize.Fifty
    // orderBy: feedType,
    // where: {
    //   metadata: { ...(focus && { mainContentFocus: [focus] }) }
    // }
  };

  const { data, error, fetchMore, loading } = useMlPostsExploreQuery({
    variables: { request }
  });

  const posts = data?.mlPostsExplore?.items;
  const pageInfo = data?.mlPostsExplore?.pageInfo;
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
        icon={<ChatBubbleBottomCenterIcon className="size-8" />}
        message="No posts yet!"
      />
    );
  }

  if (error) {
    return <ErrorMessage error={error} title="Failed to load explore feed" />;
  }

  return (
    <Card>
      <Virtuoso
        className="virtual-divider-list-window"
        data={posts}
        endReached={onEndReached}
        isScrolling={onScrolling}
        itemContent={(index, post) => (
          <SinglePost
            isFirst={index === 0}
            isLast={index === (posts?.length || 0) - 1}
            post={post}
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

export default ExploreFeed;
