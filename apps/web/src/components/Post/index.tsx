import CommentFeed from "@/components/Comment/CommentFeed";
import NoneRelevantFeed from "@/components/Comment/NoneRelevantFeed";
import MetaTags from "@/components/Common/MetaTags";
import NewPublication from "@/components/Composer/NewPublication";
import Custom404 from "@/components/Shared/404";
import Custom500 from "@/components/Shared/500";
import Footer from "@/components/Shared/Footer";
import SingleAccount from "@/components/Shared/SingleAccount";
import {
  Card,
  GridItemEight,
  GridItemFour,
  GridLayout,
  WarningMessage
} from "@/components/Shared/UI";
import { useAccountStatus } from "@/store/non-persisted/useAccountStatus";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { APP_NAME } from "@hey/data/constants";
import getAccount from "@hey/helpers/getAccount";
import getPostData from "@hey/helpers/getPostData";
import { isRepost } from "@hey/helpers/postHelpers";
import {
  PageSize,
  PostReferenceType,
  PostVisibilityFilter,
  usePostQuery,
  usePostReferencesQuery
} from "@hey/indexer";
import { useLocation, useParams } from "react-router";
import { createTrackedSelector } from "react-tracked";
import { create } from "zustand";
import FullPost from "./FullPost";
import Quotes from "./Quotes";
import RelevantPeople from "./RelevantPeople";
import PublicationPageShimmer from "./Shimmer";

interface HiddenCommentFeedState {
  setShowHiddenComments: (show: boolean) => void;
  showHiddenComments: boolean;
}

const store = create<HiddenCommentFeedState>((set) => ({
  setShowHiddenComments: (show) => set({ showHiddenComments: show }),
  showHiddenComments: false
}));

export const useHiddenCommentFeedStore = createTrackedSelector(store);

const ViewPost = () => {
  const { pathname } = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { currentAccount } = useAccountStore();
  const { isSuspended } = useAccountStatus();

  const showQuotes = pathname === `/posts/${slug}/quotes`;

  const { data, error, loading } = usePostQuery({
    skip: !slug,
    variables: { request: { post: slug } }
  });

  const { data: comments } = usePostReferencesQuery({
    skip: !slug,
    variables: {
      request: {
        pageSize: PageSize.Fifty,
        referencedPost: slug,
        visibilityFilter: PostVisibilityFilter.Hidden,
        referenceTypes: [PostReferenceType.CommentOn]
      }
    }
  });

  const hasHiddenComments = (comments?.postReferences.items.length || 0) > 0;

  if (!slug || loading) {
    return <PublicationPageShimmer publicationList={showQuotes} />;
  }

  if (!data?.post) {
    return <Custom404 />;
  }

  if (error) {
    return <Custom500 />;
  }

  const post = data?.post;
  const targetPost = isRepost(post) ? post.repostOf : post;
  const canComment =
    targetPost.operations?.canComment.__typename ===
    "PostOperationValidationPassed";

  return (
    <GridLayout>
      <MetaTags
        creator={getAccount(targetPost.author).name}
        description={getPostData(targetPost.metadata)?.content}
        title={`${targetPost.__typename} by ${
          getAccount(targetPost.author).usernameWithPrefix
        } • ${APP_NAME}`}
      />
      <GridItemEight className="space-y-5">
        {showQuotes ? (
          <Quotes post={targetPost} />
        ) : (
          <>
            <Card>
              <FullPost
                hasHiddenComments={hasHiddenComments}
                key={post?.id}
                post={post}
              />
            </Card>
            {currentAccount && !canComment && (
              <WarningMessage
                title="You cannot comment on this post"
                message="You don't have permission to comment on this post."
              />
            )}
            {currentAccount && !post.isDeleted && !isSuspended && canComment ? (
              <NewPublication post={targetPost} />
            ) : null}
            {post.isDeleted ? null : (
              <>
                <CommentFeed postId={targetPost.id} />
                <NoneRelevantFeed postId={targetPost.id} />
              </>
            )}
          </>
        )}
      </GridItemEight>
      <GridItemFour className="space-y-5">
        <Card as="aside" className="p-5">
          <SingleAccount
            hideFollowButton={
              currentAccount?.address === targetPost.author.address
            }
            hideUnfollowButton={
              currentAccount?.address === targetPost.author.address
            }
            account={targetPost.author}
            showBio
          />
        </Card>
        <RelevantPeople mentions={targetPost.mentions} />
        <Footer />
      </GridItemFour>
    </GridLayout>
  );
};

export default ViewPost;
