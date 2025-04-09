import { Card, CardHeader } from "@/components/Shared/UI";
import BackButton from "../BackButton";
import PostShimmer from "./PostShimmer";

interface PostListShimmerProps {
  title?: string;
}

const PostListShimmer = ({ title }: PostListShimmerProps) => {
  return (
    <Card className="divide-gray-200 dark:divide-gray-700">
      {title ? <CardHeader icon={<BackButton />} title={title} /> : null}
      {Array.from({ length: 3 }).map((_, index) => (
        <PostShimmer key={index} />
      ))}
    </Card>
  );
};

export default PostListShimmer;
