import Custom404 from "@/components/Shared/404";
import { PageLayout } from "@/components/Shared/PageLayout";
import Sidebar from "@/components/Shared/Sidebar";
import {} from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router";
import Accounts from "./Accounts";
import FeedType, { SearchTabFocus } from "./FeedType";
import Posts from "./Posts";

const Search = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const type =
    searchParams.get("type") || SearchTabFocus.Accounts.toLowerCase();

  const lowerCaseFeedType = [
    SearchTabFocus.Accounts.toLowerCase(),
    SearchTabFocus.Posts.toLowerCase()
  ];

  const getFeedType = (type: string | undefined) => {
    return type && lowerCaseFeedType.includes(type.toLowerCase())
      ? type.toUpperCase()
      : SearchTabFocus.Accounts;
  };

  const feedType = getFeedType(Array.isArray(type) ? type[0] : type);

  if (!q || !["accounts", "posts"].includes(type as string)) {
    return <Custom404 />;
  }

  return (
    <PageLayout title="Search" sidebar={<Sidebar />}>
      <FeedType feedType={feedType as SearchTabFocus} />
      {feedType === SearchTabFocus.Accounts ? (
        <Accounts query={q as string} />
      ) : null}
      {feedType === SearchTabFocus.Posts ? <Posts query={q as string} /> : null}
    </PageLayout>
  );
};

export default Search;
