import BackButton from "@/components/Shared/BackButton";
import Footer from "@/components/Shared/Footer";
import { PageLayout } from "@/components/Shared/PageLayout";
import PostListShimmer from "@/components/Shared/Shimmer/PostListShimmer";
import PostShimmer from "@/components/Shared/Shimmer/PostShimmer";
import PostsShimmer from "@/components/Shared/Shimmer/PostsShimmer";
import SingleAccountShimmer from "@/components/Shared/Shimmer/SingleAccountShimmer";
import { Card, CardHeader } from "@/components/Shared/UI";

interface PublicationPageShimmerProps {
  publicationList?: boolean;
}

const PublicationPageShimmer = ({
  publicationList = false
}: PublicationPageShimmerProps) => {
  return (
    <PageLayout
      sidebar={
        <div className="space-y-5">
          <Card className="p-5">
            <SingleAccountShimmer />
          </Card>
          <Card className="space-y-4 p-5">
            <SingleAccountShimmer showFollowUnfollowButton />
            <SingleAccountShimmer showFollowUnfollowButton />
            <SingleAccountShimmer showFollowUnfollowButton />
            <SingleAccountShimmer showFollowUnfollowButton />
            <SingleAccountShimmer showFollowUnfollowButton />
          </Card>
          <Footer />
        </div>
      }
      zeroTopMargin
    >
      {publicationList ? (
        <PostListShimmer title="Post" />
      ) : (
        <>
          <Card>
            <CardHeader icon={<BackButton />} title="Post" />
            <PostShimmer />
          </Card>
          <PostsShimmer />
        </>
      )}
    </PageLayout>
  );
};

export default PublicationPageShimmer;
