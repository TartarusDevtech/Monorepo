import Oembed from "@components/Shared/Oembed";
import getURLs from "@hey/helpers/getURLs";
import type { FC } from "react";
import { usePostAttachmentStore } from "src/store/non-persisted/post/usePostAttachmentStore";
import { usePostStore } from "src/store/non-persisted/post/usePostStore";

const LinkPreviews: FC = () => {
  const { postContent, quotedPost } = usePostStore();
  const { attachments } = usePostAttachmentStore((state) => state);
  const urls = getURLs(postContent);

  if (!urls.length || attachments.length || quotedPost) {
    return null;
  }

  return (
    <div className="m-5">
      <Oembed url={urls[0]} />
    </div>
  );
};

export default LinkPreviews;
