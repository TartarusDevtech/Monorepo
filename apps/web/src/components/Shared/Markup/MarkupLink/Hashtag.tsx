import stopEventPropagation from "@/helpers/stopEventPropagation";
import type { MarkupLinkProps } from "@hey/types/misc";
import { Link } from "react-router";

const Hashtag = ({ title }: MarkupLinkProps) => {
  if (!title) {
    return null;
  }

  return (
    <span className="inline-flex items-center space-x-1">
      <span>
        <Link
          className="outline-hidden focus:underline"
          to={`/search?q=${title}&src=link_click&type=posts`}
          onClick={stopEventPropagation}
        >
          {title}
        </Link>
      </span>
    </span>
  );
};

export default Hashtag;
