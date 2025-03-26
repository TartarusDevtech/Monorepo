import { trpc } from "@/helpers/trpc";
import { ALLOWED_HTML_HOSTS } from "@hey/data/og";
import getFavicon from "@hey/helpers/getFavicon";
import { useQuery } from "@tanstack/react-query";
import Embed from "./Embed";
import EmptyOembed from "./EmptyOembed";
import Player from "./Player";

interface OembedProps {
  url: string;
}

const Oembed = ({ url }: OembedProps) => {
  const { data, error, isLoading } = useQuery(
    trpc.oembed.get.queryOptions({ url }, { enabled: Boolean(url) })
  );

  if (isLoading || error || !data) {
    if (error) {
      return null;
    }

    const hostname = new URL(url).hostname.replace("www.", "");

    if (ALLOWED_HTML_HOSTS.includes(hostname)) {
      return <div className="shimmer mt-4 h-[415px] w-full rounded-xl" />;
    }

    return <EmptyOembed url={url} />;
  }

  const og = {
    description: data?.description,
    favicon: getFavicon(data.url),
    html: data?.html,
    image: data?.image,
    site: data?.site,
    title: data?.title,
    url: url as string
  };

  if (!og.title && !og.html) {
    return null;
  }

  if (og.html) {
    return <Player og={og} />;
  }

  return <Embed og={og} />;
};

export default Oembed;
