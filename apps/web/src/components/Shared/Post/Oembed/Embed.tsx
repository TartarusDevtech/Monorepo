import { Card } from "@/components/Shared/UI";
import type { OembedRouterOutput } from "@hey/api/src/routers/oembed";
import stopEventPropagation from "@hey/helpers/stopEventPropagation";
import { Link } from "react-router";

interface EmbedProps {
  og: OembedRouterOutput["get"];
}

const Embed = ({ og }: EmbedProps) => {
  if (!og) {
    return null;
  }

  return (
    <div className="mt-4 w-full text-sm md:w-4/6">
      <Link
        to={og.url}
        onClick={stopEventPropagation}
        rel="noreferrer noopener"
        target={og.url.includes(location.host) ? "_self" : "_blank"}
      >
        <Card className="truncate p-5" forceRounded>
          <div className="space-y-1">
            {og.title ? (
              <div className="flex items-center space-x-1.5">
                {og.favicon ? (
                  <img
                    alt="Favicon"
                    className="size-4 rounded-full"
                    height={16}
                    src={og.favicon}
                    title={og.site || og.url}
                    width={16}
                  />
                ) : null}
                <b className="truncate">{og.title}</b>
              </div>
            ) : null}
            {og.description ? (
              <div className="line-clamp-1 whitespace-break-spaces text-gray-500 dark:text-gray-200">
                {og.description.replace(/ +/g, " ")}
              </div>
            ) : null}
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default Embed;
