import Oembed from "@/components/Shared/Post/Oembed";
import { usePostAttachmentStore } from "@/store/non-persisted/post/usePostAttachmentStore";
import { usePostStore } from "@/store/non-persisted/post/usePostStore";
import getURLs from "@hey/helpers/getURLs";

const LinkPreviews = () => {
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
