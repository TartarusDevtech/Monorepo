import { usePostStore } from "@/store/non-persisted/post/usePostStore";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { isRepost } from "@hey/helpers/postHelpers";
import stopEventPropagation from "@hey/helpers/stopEventPropagation";
import type {
  AnyPostFragment,
  PostGroupInfoFragment,
  TimelineItemFragment
} from "@hey/indexer";
import PostMenu from "./Actions/Menu";
import PostAccount from "./PostAccount";

interface PostHeaderProps {
  timelineItem?: TimelineItemFragment;
  isNew?: boolean;
  post: AnyPostFragment;
  quoted?: boolean;
}

const PostHeader = ({
  timelineItem,
  isNew = false,
  post,
  quoted = false
}: PostHeaderProps) => {
  const { setQuotedPost } = usePostStore();

  const targetPost = isRepost(post) ? post?.repostOf : post;
  const rootPost = timelineItem ? timelineItem?.primary : targetPost;
  const account = timelineItem ? rootPost.author : targetPost.author;
  const timestamp = timelineItem ? rootPost.timestamp : targetPost.timestamp;

  return (
    <div
      className="flex w-full items-start justify-between"
      onClick={stopEventPropagation}
    >
      <PostAccount
        account={account}
        group={targetPost.feed?.group as PostGroupInfoFragment}
        postSlug={targetPost.slug}
        timestamp={timestamp}
      />
      {!post.isDeleted && !quoted ? (
        <PostMenu post={targetPost} />
      ) : (
        <div className="size-[30px]" />
      )}
      {quoted && isNew ? (
        <button
          aria-label="Remove Quote"
          className="rounded-full border border-neutral-200 p-1.5 hover:bg-neutral-300/20 dark:border-neutral-700"
          onClick={() => setQuotedPost()}
          type="reset"
        >
          <XMarkIcon className="size-4 text-neutral-500 dark:text-neutral-200" />
        </button>
      ) : null}
    </div>
  );
};

export default PostHeader;
