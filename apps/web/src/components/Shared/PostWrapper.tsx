import type { AnyPostFragment } from "@hey/indexer";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

interface PostWrapperProps {
  children: ReactNode | ReactNode[];
  className?: string;
  post: AnyPostFragment;
}

const PostWrapper = ({ children, className = "", post }: PostWrapperProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const selection = window.getSelection();
    if (!selection || !selection.toString().length) {
      navigate(`/posts/${post.id}`);
    }
  };

  return (
    <article className={className} onClick={handleClick}>
      {children}
    </article>
  );
};

export default PostWrapper;
