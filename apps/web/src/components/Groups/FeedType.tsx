import { TabButton } from "@/components/Shared/UI";
import { MotionTabIndicator } from "@/components/Shared/UI/TabButton";
import type {} from "react";

export enum GroupsTabFocus {
  Member = "MEMBER",
  Managed = "MANAGED"
}

interface FocusTypeProps {
  feedType: GroupsTabFocus;
}

const FeedType = ({ feedType }: FocusTypeProps) => {
  const tabs = [
    { name: "Your groups", type: GroupsTabFocus.Member },
    { name: "Managed groups", type: GroupsTabFocus.Managed }
  ].filter((tab): tab is { name: string; type: GroupsTabFocus } =>
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
              type={tab.type.toLowerCase()}
              className="relative"
            />
          </div>
        );
      })}
    </li>
  );
};

export default FeedType;
