import BackButton from "@/components/Shared/BackButton";
import PostListShimmer from "@/components/Shared/Shimmer/PostListShimmer";
import {
  Card,
  CardHeader,
  EmptyState,
  ErrorMessage
} from "@/components/Shared/UI";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import {
  PageSize,
  type PostFragment,
  PostReferenceType,
  type PostReferencesRequest,
  usePostReferencesQuery
} from "@hey/indexer";
import { Virtuoso } from "react-virtuoso";
import SinglePost from "./SinglePost";

interface QuotesProps {
  post: PostFragment;
}

const Quotes = ({ post }: QuotesProps) => {
  const request: PostReferencesRequest = {
    pageSize: PageSize.Fifty,
    referenceTypes: [PostReferenceType.QuoteOf],
    referencedPost: post.id
  };

  const { data, error, fetchMore, loading } = usePostReferencesQuery({
    skip: !post.id,
    variables: { request }
  });

  const quotes = data?.postReferences?.items ?? [];
  const pageInfo = data?.postReferences?.pageInfo;
  const hasMore = pageInfo?.next;

  const onEndReached = async () => {
    if (hasMore) {
      await fetchMore({
        variables: { request: { ...request, cursor: pageInfo?.next } }
      });
    }
  };

  if (loading) {
    return <PostListShimmer title="Quote" />;
  }

  if (error) {
    return <ErrorMessage error={error} title="Failed to load comment feed" />;
  }

  if (!quotes.length) {
    return (
      <EmptyState
        icon={<ChatBubbleBottomCenterTextIcon className="size-8" />}
        message="Be the first one to quote!"
      />
    );
  }

  return (
    <Card>
      <CardHeader icon={<BackButton />} title="Quotes" />
      <Virtuoso
        className="virtual-divider-list-window"
        data={quotes}
        endReached={onEndReached}
        itemContent={(index, quote) => (
          <SinglePost
            isFirst={false}
            isLast={index === quotes.length - 1}
            post={quote}
            showType={false}
          />
        )}
        useWindowScroll
      />
    </Card>
  );
};

export default Quotes;
