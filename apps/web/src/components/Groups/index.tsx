import Footer from "@/components/Shared/Footer";
import NotLoggedIn from "@/components/Shared/NotLoggedIn";
import { PageLayout } from "@/components/Shared/PageLayout";
import { Card } from "@/components/Shared/UI";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { useSearchParams } from "react-router";
import FeedType, { GroupsTabFocus } from "./FeedType";
import List from "./List";
import CreateGroup from "./Sidebar/Create/CreateGroup";

const Groups = () => {
  const { currentAccount } = useAccountStore();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || GroupsTabFocus.Member.toLowerCase();

  const lowerCaseFeedType = [
    GroupsTabFocus.Member.toLowerCase(),
    GroupsTabFocus.Managed.toLowerCase()
  ];

  const getFeedType = (type: string | undefined) => {
    return type && lowerCaseFeedType.includes(type.toLowerCase())
      ? type.toUpperCase()
      : GroupsTabFocus.Member;
  };

  const feedType = getFeedType(Array.isArray(type) ? type[0] : type);

  if (!currentAccount) {
    return <NotLoggedIn />;
  }

  return (
    <PageLayout
      title="Groups"
      sidebar={
        <>
          <CreateGroup />
          <Footer />
        </>
      }
    >
      <FeedType feedType={feedType as GroupsTabFocus} />
      <Card>
        <List feedType={feedType as GroupsTabFocus} />
      </Card>
    </PageLayout>
  );
};

export default Groups;
