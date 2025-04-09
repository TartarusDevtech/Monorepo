import New from "@/components/Shared/Badges/New";
import { TabButton } from "@/components/Shared/UI";
import { MotionTabIndicator } from "@/components/Shared/UI/TabButton";
import { useHomeTabStore } from "@/store/persisted/useHomeTabStore";
import { HomeFeedType } from "@hey/data/enums";
import type { JSX } from "react";

const FeedType = () => {
  const { feedType, setFeedType } = useHomeTabStore();

  const tabs = [
    { name: "Following", type: HomeFeedType.FOLLOWING },
    { name: "Highlights", type: HomeFeedType.HIGHLIGHTS },
    { badge: <New />, name: "For You", type: HomeFeedType.FORYOU }
  ].filter(
    (
      tab
    ): tab is {
      badge?: JSX.Element;
      name: string;
      type: HomeFeedType;
    } => Boolean(tab)
  );

  return (
    <li className="flex flex-wrap gap-3 px-5 md:px-0">
      {tabs.map((tab) => {
        const isSelected = feedType === tab.type;
        return (
          <div key={tab.type} className="relative">
            {isSelected && <MotionTabIndicator layoutId="home-tabs" />}
            <TabButton
              active={isSelected}
              badge={tab.badge}
              name={tab.name}
              onClick={() => setFeedType(tab.type)}
              className="relative"
            />
          </div>
        );
      })}
    </li>
  );
};

export default FeedType;
