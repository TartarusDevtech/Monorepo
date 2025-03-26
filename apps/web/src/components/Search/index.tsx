import Sidebar from "@/components/Shared/Sidebar";
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from "@/components/Shared/UI";
import Custom404 from "@/pages/404";
import { PencilSquareIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Accounts from "./Accounts";
import Posts from "./Posts";

const Search = () => {
  const { query } = useRouter();
  const searchText = Array.isArray(query.q)
    ? encodeURIComponent(query.q.join(" "))
    : encodeURIComponent(query.q || "");

  if (!query.q || !["accounts", "posts"].includes(query.type as string)) {
    return <Custom404 />;
  }

  const settingsSidebarItems = [
    {
      active: query.type === "posts",
      icon: <PencilSquareIcon className="size-4" />,
      title: "Publications",
      url: `/search?q=${searchText}&type=posts`
    },
    {
      active: query.type === "accounts",
      icon: <UsersIcon className="size-4" />,
      title: "Accounts",
      url: `/search?q=${searchText}&type=accounts`
    }
  ];

  return (
    <GridLayout>
      <GridItemFour>
        <Sidebar items={settingsSidebarItems} />
      </GridItemFour>
      <GridItemEight>
        {query.type === "accounts" ? (
          <Accounts query={query.q as string} />
        ) : null}
        {query.type === "posts" ? <Posts query={query.q as string} /> : null}
      </GridItemEight>
    </GridLayout>
  );
};

export default Search;
