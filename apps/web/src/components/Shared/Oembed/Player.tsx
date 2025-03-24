import type { OembedRouterOutput } from "@hey/rpc/src/routers/oembed";
import type { FC } from "react";

interface PlayerProps {
  og: OembedRouterOutput["get"];
}

const Player: FC<PlayerProps> = ({ og }) => {
  if (!og) {
    return null;
  }

  return (
    <div className="mt-4 w-full text-sm">
      <div
        className="oembed-player"
        dangerouslySetInnerHTML={{ __html: og.html as string }}
      />
    </div>
  );
};

export default Player;
