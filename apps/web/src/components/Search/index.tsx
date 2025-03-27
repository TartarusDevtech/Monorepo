import Custom404 from "@/components/Shared/404";
import Sidebar from "@/components/Shared/Sidebar";
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from "@/components/Shared/UI";
import { PencilSquareIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router";
import Accounts from "./Accounts";
import Posts from "./Posts";

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q");
  const type = searchParams.get("type");

  const searchText = Array.isArray(q)
    ? encodeURIComponent(q.join(" "))
    : encodeURIComponent(q || "");

  if (!q || !["accounts", "posts"].includes(type as string)) {
    return <Custom404 />;
  }

  const settingsSidebarItems = [
    {
      active: type === "posts",
      icon: <PencilSquareIcon className="size-4" />,
      title: "Publications",
      url: `/search?q=${searchText}&type=posts`
    },
    {
      active: type === "accounts",
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
        {type === "accounts" ? <Accounts query={q as string} /> : null}
        {type === "posts" ? <Posts query={q as string} /> : null}
      </GridItemEight>
    </GridLayout>
  );
};

export default Search;
