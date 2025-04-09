import { MainContentFocus } from "@hey/indexer";
import type { Dispatch, SetStateAction } from "react";
import { TabButton } from "../UI";
import { MotionTabIndicator } from "../UI/TabButton";

interface ContentFeedTypeProps {
  focus?: MainContentFocus;
  setFocus: Dispatch<SetStateAction<MainContentFocus | undefined>>;
  layoutId: string;
}

const ContentFeedType = ({
  focus,
  setFocus,
  layoutId
}: ContentFeedTypeProps) => {
  const tabs = [
    { name: "All posts", type: undefined },
    { name: "Text", type: MainContentFocus.TextOnly },
    { name: "Video", type: MainContentFocus.Video },
    { name: "Audio", type: MainContentFocus.Audio },
    { name: "Images", type: MainContentFocus.Image }
  ];

  return (
    <li className="mx-5 flex flex-wrap gap-3 md:mx-0">
      {tabs.map((tab) => {
        const isSelected = focus === tab.type;
        return (
          <div key={tab.type} className="relative">
            {isSelected && <MotionTabIndicator layoutId={layoutId} />}
            <TabButton
              active={isSelected}
              name={tab.name}
              onClick={() => setFocus(tab.type)}
              className="relative"
            />
          </div>
        );
      })}
    </li>
  );
};

export default ContentFeedType;
