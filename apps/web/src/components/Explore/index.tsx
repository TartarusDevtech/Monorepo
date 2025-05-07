import Footer from "@/components/Shared/Footer";
import { PageLayout } from "@/components/Shared/PageLayout";
import ContentFeedType from "@/components/Shared/Post/ContentFeedType";
import WhoToFollow from "@/components/Shared/Sidebar/WhoToFollow";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { MainContentFocus } from "@hey/indexer";
import { useState } from "react";
import ExploreFeed from "./ExploreFeed";
import ImageFeed from "./ImageFeed";

const Explore = () => {
  const { currentAccount } = useAccountStore();
  const [focus, setFocus] = useState<MainContentFocus>();

  return (
    <PageLayout
      title="Explore"
      sidebar={
        <>
          {/* <Gitcoin /> */}
          {currentAccount ? <WhoToFollow /> : null}
          <Footer />
        </>
      }
    >
      <ContentFeedType
        focus={focus}
        setFocus={setFocus}
        layoutId="explore_tab"
      />
      {focus === MainContentFocus.Image ? (
        <ImageFeed />
      ) : (
        <ExploreFeed focus={focus} />
      )}
    </PageLayout>
  );
};

export default Explore;
