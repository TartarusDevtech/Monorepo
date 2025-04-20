import BackButton from "@/components/Shared/BackButton";
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
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { WindowVirtualizer } from "virtua";
import PostShimmer from "../Shared/Shimmer/PostShimmer";
import SinglePost from "./SinglePost";

interface QuotesProps {
  post: PostFragment;
}

const Quotes = ({ post }: QuotesProps) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px"
  });

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

  useEffect(() => {
    if (entry?.isIntersecting) {
      onEndReached();
    }
  }, [entry?.isIntersecting]);

  if (error) {
    return <ErrorMessage error={error} title="Failed to load comment feed" />;
  }

  return (
    <Card>
      <CardHeader icon={<BackButton />} title="Quotes" />
      {loading ? (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {Array.from({ length: 3 }).map((_, index) => (
            <PostShimmer key={index} />
          ))}
        </div>
      ) : error ? (
        <ErrorMessage error={error} title="Failed to load comment feed" />
      ) : quotes.length ? (
        <div className="virtual-divider-list-window">
          <WindowVirtualizer>
            {quotes.map((quote, index) => (
              <SinglePost
                key={quote.id}
                isFirst={false}
                isLast={index === quotes.length - 1}
                post={quote}
                showType={false}
              />
            ))}
            {hasMore && <span ref={ref} />}
          </WindowVirtualizer>
        </div>
      ) : (
        <EmptyState
          icon={<ChatBubbleBottomCenterTextIcon className="size-8" />}
          message="Be the first one to quote!"
          hideCard
        />
      )}
    </Card>
  );
};

export default Quotes;
