import { TabButton } from "@/components/Shared/UI";
import { MotionTabIndicator } from "@/components/Shared/UI/TabButton";

export enum SearchTabFocus {
  Accounts = "ACCOUNTS",
  Posts = "POSTS"
}

interface FeedTypeProps {
  feedType: SearchTabFocus;
}

const FeedType = ({ feedType }: FeedTypeProps) => {
  const tabs = [
    { name: "Accounts", type: SearchTabFocus.Accounts },
    { name: "Posts", type: SearchTabFocus.Posts }
  ].filter((tab): tab is { name: string; type: SearchTabFocus } =>
    Boolean(tab)
  );

  return (
    <li className="flex flex-wrap gap-3 px-5 md:px-0">
      {tabs.map((tab) => {
        const isSelected = feedType === tab.type;
        return (
          <div key={tab.type} className="relative">
            {isSelected && <MotionTabIndicator layoutId="search-tabs" />}
            <TabButton
              active={isSelected}
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
