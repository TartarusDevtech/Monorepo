import SingleImagePost from "@/components/Post/SingleImagePost";
import ImagePostsShimmer from "@/components/Shared/Shimmer/ImagePostsShimmer";
import { EmptyState, ErrorMessage } from "@/components/Shared/UI";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import {
  MainContentFocus,
  PageSize,
  type PostsExploreRequest,
  usePostsExploreQuery
} from "@hey/indexer";

const ImageFeed = () => {
  const request: PostsExploreRequest = {
    pageSize: PageSize.Fifty,
    filter: { metadata: { mainContentFocus: [MainContentFocus.Image] } }
  };

  const { data, error, loading } = usePostsExploreQuery({
    variables: { request }
  });

  const posts = data?.mlPostsExplore?.items;

  if (loading) {
    return <ImagePostsShimmer />;
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
    <div className="grid grid-cols-3 gap-4">
      {posts?.map((post) => (
        <SingleImagePost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default ImageFeed;
