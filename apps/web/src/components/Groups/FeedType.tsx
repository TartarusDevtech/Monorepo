import { TabButton } from "@/components/Shared/UI";
import { MotionTabIndicator } from "@/components/Shared/UI/TabButton";
import { GroupsFeedType } from "@hey/data/enums";
import type { Dispatch, SetStateAction } from "react";

interface FocusTypeProps {
  feedType: GroupsFeedType;
  setFeedType: Dispatch<SetStateAction<GroupsFeedType>>;
}

const FeedType = ({ feedType, setFeedType }: FocusTypeProps) => {
  const tabs = [
    { name: "Managed groups", type: GroupsFeedType.Managed },
    { name: "Your groups", type: GroupsFeedType.Member }
  ].filter((tab): tab is { name: string; type: GroupsFeedType } =>
    Boolean(tab)
  );

  return (
    <li className="mx-5 flex flex-wrap gap-3 sm:mx-0">
      {tabs.map((tab) => {
        const isSelected = feedType === tab.type;
        return (
          <div key={tab.type} className="relative">
            {isSelected && <MotionTabIndicator layoutId="groups-tabs" />}
            <TabButton
              active={isSelected}
              key={tab.type}
              name={tab.name}
              className="relative"
              onClick={() => setFeedType(tab.type)}
            />
          </div>
        );
      })}
    </li>
  );
};

export default FeedType;
