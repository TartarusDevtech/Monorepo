import Accounts from "@/components/Staff/Accounts";
import StaffAccountOverview from "@/components/Staff/Accounts/Overview";
import StaffOverview from "@/components/Staff/Overview";
import Permissions from "@/components/Staff/Permissions";
import type { RouteConfig } from ".";

const staffRoutes: RouteConfig[] = [
  {
    path: "staff",
    element: <StaffOverview />,
    children: [
      { path: "permissions", element: <Permissions /> },
      {
        path: "accounts",
        element: <Accounts />,
        children: [
          {
            path: ":address",
            element: <StaffAccountOverview />
          }
        ]
      }
    ]
  }
];

export default staffRoutes;
