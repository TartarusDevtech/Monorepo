import { TabButton } from "@/components/Shared/UI";
import { MotionTabIndicator } from "@/components/Shared/UI/TabButton";
import { NotificationFeedType } from "@hey/data/enums";
import type { Dispatch, SetStateAction } from "react";

interface FeedTypeProps {
  feedType: NotificationFeedType;
  setFeedType: Dispatch<SetStateAction<NotificationFeedType>>;
}

const FeedType = ({ feedType, setFeedType }: FeedTypeProps) => {
  const tabs = [
    { name: "All", type: NotificationFeedType.All },
    { name: "Mentions", type: NotificationFeedType.Mentions },
    { name: "Comments", type: NotificationFeedType.Comments },
    { name: "Likes", type: NotificationFeedType.Likes },
    { name: "Actions", type: NotificationFeedType.PostActions }
  ];

  return (
    <li className="flex gap-3 overflow-x-auto px-5 sm:mt-0 md:px-0 md:pb-0">
      {tabs.map((tab) => {
        const isSelected = feedType === tab.type;
        return (
          <div key={tab.type} className="relative">
            {isSelected && <MotionTabIndicator layoutId="notification-tabs" />}
            <TabButton
              active={isSelected}
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
