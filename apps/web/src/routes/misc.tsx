import Groups from "@/components/Groups";
import Home from "@/components/Home";
import Notification from "@/components/Notification";
import Terms from "@/components/Pages/Terms";
import Search from "@/components/Search";
import Support from "@/components/Support";
import type { RouteConfig } from ".";
import ViewProfile from "../components/Account";
import Bookmarks from "../components/Bookmarks";
import Explore from "../components/Explore";
import Copyright from "../components/Pages/Copyright";
import Guidelines from "../components/Pages/Guidelines";
import Privacy from "../components/Pages/Privacy";

const mainRoutes: RouteConfig[] = [
  { path: "/", element: <Home /> },
  { path: "explore", element: <Explore /> },
  { path: "search", element: <Search /> },
  { path: "groups", element: <Groups /> },
  { path: "bookmarks", element: <Bookmarks /> },
  { path: "notifications", element: <Notification /> },
  { path: "account/:address", element: <ViewProfile /> },
  { path: "u/:username", element: <ViewProfile /> },
  { path: "support", element: <Support /> },
  { path: "terms", element: <Terms /> },
  { path: "privacy", element: <Privacy /> },
  { path: "guidelines", element: <Guidelines /> },
  { path: "copyright", element: <Copyright /> }
];

export default mainRoutes;
