import injectReferrerToUrl from "@/helpers/injectReferrerToUrl";
import stopEventPropagation from "@/helpers/stopEventPropagation";
import truncateUrl from "@/helpers/truncateUrl";
import type { MarkupLinkProps } from "@hey/types/misc";
import { Link } from "react-router";

const ExternalLink = ({ title }: MarkupLinkProps) => {
  let href = title;

  if (!href) {
    return null;
  }

  if (!href.includes("://")) {
    href = `https://${href}`;
  }

  const url = injectReferrerToUrl(href);

  return (
    <Link
      to={url}
      onClick={stopEventPropagation}
      rel="noopener"
      target={url.includes(location.host) ? "_self" : "_blank"}
    >
      {title ? truncateUrl(title, 30) : title}
    </Link>
  );
};

export default ExternalLink;
