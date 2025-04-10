import { TabButton } from "@/components/Shared/UI";
import { MotionTabIndicator } from "@/components/Shared/UI/TabButton";
import { AccountFeedType } from "@hey/data/enums";
import type { Dispatch, SetStateAction } from "react";
import MediaFilter from "./Filters/MediaFilter";

interface FeedTypeProps {
  feedType: AccountFeedType;
  setFeedType: Dispatch<SetStateAction<AccountFeedType>>;
}

const FeedType = ({ feedType, setFeedType }: FeedTypeProps) => {
  const tabs = [
    { name: "Feed", type: AccountFeedType.Feed },
    { name: "Replies", type: AccountFeedType.Replies },
    { name: "Media", type: AccountFeedType.Media },
    { name: "Collected", type: AccountFeedType.Collects }
  ].filter((tab): tab is { name: string; type: AccountFeedType } =>
    Boolean(tab)
  );

  return (
    <div className="flex items-center justify-between">
      <li className="flex gap-3 overflow-x-auto px-5 pb-2 md:px-0 md:pb-0">
        {tabs.map((tab) => {
          const isSelected = feedType === tab.type;
          return (
            <div key={tab.type} className="relative">
              {isSelected && <MotionTabIndicator layoutId="account-tabs" />}
              <TabButton
                active={feedType === tab.type}
                key={tab.type}
                name={tab.name}
                className="relative"
                onClick={() => setFeedType(tab.type)}
              />
            </div>
          );
        })}
      </li>
      {feedType === AccountFeedType.Media && <MediaFilter />}
    </div>
  );
};

export default FeedType;
