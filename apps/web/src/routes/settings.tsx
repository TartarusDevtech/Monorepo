import type { RouteConfig } from ".";
import AccountSettings from "../components/Settings/Account";
import BlockedSettings from "../components/Settings/Blocked";
import DangerSettings from "../components/Settings/Danger";
import DeveloperSettings from "../components/Settings/Developer";
import FundsSettings from "../components/Settings/Funds";
import ManagerSettings from "../components/Settings/Manager";
import PreferencesSettings from "../components/Settings/Preferences";
import ProfileSettings from "../components/Settings/Profile";
import SessionsSettings from "../components/Settings/Sessions";
import UsernameSettings from "../components/Settings/Username";

const settingsRoutes: RouteConfig[] = [
  {
    path: "settings",
    element: <ProfileSettings />,
    children: [
      { path: "account", element: <AccountSettings /> },
      { path: "blocked", element: <BlockedSettings /> },
      { path: "danger", element: <DangerSettings /> },
      { path: "developer", element: <DeveloperSettings /> },
      { path: "funds", element: <FundsSettings /> },
      { path: "manager", element: <ManagerSettings /> },
      { path: "preferences", element: <PreferencesSettings /> },
      { path: "sessions", element: <SessionsSettings /> },
      { path: "username", element: <UsernameSettings /> }
    ]
  }
];

export default settingsRoutes;
