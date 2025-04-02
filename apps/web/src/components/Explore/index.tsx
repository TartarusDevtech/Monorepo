import WhoToFollow from "@/components/Home/Sidebar/WhoToFollow";
import FeedFocusType from "@/components/Shared/FeedFocusType";
import Footer from "@/components/Shared/Footer";
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from "@/components/Shared/UI";
import cn from "@/helpers/cn";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { MainContentFocus } from "@hey/indexer";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import ExploreFeed from "./ExploreFeed";
import ImageFeed from "./ImageFeed";

const Explore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = Number(searchParams.get("tab")) || 0;

  const { currentAccount } = useAccountStore();
  const [focus, setFocus] = useState<MainContentFocus>();

  const tabs = [
    { name: "For you", type: "LensCurated" },
    { name: "Popular", type: "TopCommented" },
    {
      name: "Trending",
      type: "TopCollectedOpenAction"
    },
    { name: "Interesting", type: "TopMirrored" }
  ];

  return (
    <GridLayout>
      <GridItemEight className="space-y-5">
        <TabGroup
          defaultIndex={Number(tab)}
          onChange={(index) => {
            const params = new URLSearchParams(location.search);
            params.set("tab", index.toString());
            navigate(`${location.pathname}?${params.toString()}`, {
              replace: true
            });
          }}
        >
          <TabList className="divider space-x-8">
            {tabs.map((tab, index) => (
              <Tab
                className={({ selected }) =>
                  cn(
                    { "border-black border-b-2 dark:border-white": selected },
                    "px-4 pb-2 font-medium text-xs outline-hidden sm:text-sm"
                  )
                }
                defaultChecked={index === 1}
                key={tab.type}
              >
                {tab.name}
              </Tab>
            ))}
          </TabList>
          <FeedFocusType focus={focus} setFocus={setFocus} />
          <TabPanels>
            {tabs.map((tab) => (
              <TabPanel key={tab.type}>
                {focus === MainContentFocus.Image ? (
                  <ImageFeed feedType={tab.type} />
                ) : (
                  <ExploreFeed feedType={tab.type} focus={focus} />
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </GridItemEight>
      <GridItemFour>
        {/* <Gitcoin /> */}
        {currentAccount ? <WhoToFollow /> : null}
        <Footer />
      </GridItemFour>
    </GridLayout>
  );
};

export default Explore;
