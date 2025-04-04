import ViewGroup from "@/components/Group";
import GroupSettings from "@/components/Group/Settings/Overview";
import RulesSettings from "@/components/Group/Settings/Rules";
import type { RouteConfig } from ".";

const groupRoutes: RouteConfig[] = [
  {
    path: "g/:address",
    element: <ViewGroup />,
    children: [
      {
        path: "settings",
        element: <GroupSettings />,
        children: [{ path: "rules", element: <RulesSettings /> }]
      }
    ]
  }
];

export default groupRoutes;
