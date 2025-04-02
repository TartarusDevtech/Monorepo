import cn from "@/helpers/cn";
import { MainContentFocus } from "@hey/indexer";
import type { Dispatch, SetStateAction } from "react";

interface FeedLinkProps {
  focus?: MainContentFocus;
  name: string;
  setFocus: Dispatch<SetStateAction<MainContentFocus | undefined>>;
  type?: MainContentFocus;
}

const FeedLink = ({ focus, name, setFocus, type }: FeedLinkProps) => (
  <button
    aria-label={name}
    className={cn(
      focus === type
        ? "bg-black text-white"
        : "bg-neutral-100 dark:bg-neutral-800",
      "rounded-full px-3 py-1.5 text-xs sm:px-4",
      "border border-neutral-300 dark:border-neutral-500"
    )}
    onClick={() => setFocus(type)}
    type="button"
  >
    {name}
  </button>
);

interface FeedFocusTypeProps {
  focus?: MainContentFocus;
  setFocus: Dispatch<SetStateAction<MainContentFocus | undefined>>;
}

const FeedFocusType = ({ focus, setFocus }: FeedFocusTypeProps) => (
  <div className="mx-5 my-5 flex flex-wrap gap-3 sm:mx-0">
    <FeedLink focus={focus} name="All posts" setFocus={setFocus} />
    <FeedLink
      focus={focus}
      name="Text"
      setFocus={setFocus}
      type={MainContentFocus.TextOnly}
    />
    <FeedLink
      focus={focus}
      name="Video"
      setFocus={setFocus}
      type={MainContentFocus.Video}
    />
    <FeedLink
      focus={focus}
      name="Audio"
      setFocus={setFocus}
      type={MainContentFocus.Audio}
    />
    <FeedLink
      focus={focus}
      name="Images"
      setFocus={setFocus}
      type={MainContentFocus.Image}
    />
  </div>
);

export default FeedFocusType;
