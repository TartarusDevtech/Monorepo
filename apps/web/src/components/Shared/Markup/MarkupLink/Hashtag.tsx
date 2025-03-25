import stopEventPropagation from "@hey/helpers/stopEventPropagation";
import type { MarkupLinkProps } from "@hey/types/misc";
import Link from "next/link";

const Hashtag = ({ title }: MarkupLinkProps) => {
  if (!title) {
    return null;
  }

  return (
    <span className="inline-flex items-center space-x-1">
      <span>
        <Link
          className="outline-none focus:underline"
          href={`/search?q=${title}&src=link_click&type=posts`}
          onClick={stopEventPropagation}
        >
          {title}
        </Link>
      </span>
    </span>
  );
};

export default Hashtag;
