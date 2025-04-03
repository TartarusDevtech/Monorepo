import WhoToFollow from "@/components/Home/Sidebar/WhoToFollow";
import FeedFocusType from "@/components/Shared/FeedFocusType";
import Footer from "@/components/Shared/Footer";
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from "@/components/Shared/UI";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import {} from "@headlessui/react";
import { MainContentFocus } from "@hey/indexer";
import { useState } from "react";
import ExploreFeed from "./ExploreFeed";
import ImageFeed from "./ImageFeed";

const Explore = () => {
  const { currentAccount } = useAccountStore();
  const [focus, setFocus] = useState<MainContentFocus>();

  return (
    <GridLayout>
      <GridItemEight className="space-y-5">
        <FeedFocusType focus={focus} setFocus={setFocus} />
        {focus === MainContentFocus.Image ? (
          <ImageFeed />
        ) : (
          <ExploreFeed focus={focus} />
        )}
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
