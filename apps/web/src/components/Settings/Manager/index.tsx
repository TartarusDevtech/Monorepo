import MetaTags from "@/components/Common/MetaTags";
import NotLoggedIn from "@/components/Shared/NotLoggedIn";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { APP_NAME } from "@hey/data/constants";
import { GridItemEight, GridItemFour, GridLayout } from "@hey/ui";
import SettingsSidebar from "../Sidebar";
import AccountManager from "./AccountManager";
import Signless from "./Signless";

const ManagerSettings = () => {
  const { currentAccount } = useAccountStore();

  if (!currentAccount) {
    return <NotLoggedIn />;
  }

  return (
    <GridLayout>
      <MetaTags title={`Manager • ${APP_NAME}`} />
      <GridItemFour>
        <SettingsSidebar />
      </GridItemFour>
      <GridItemEight className="space-y-5">
        <Signless />
        <AccountManager />
      </GridItemEight>
    </GridLayout>
  );
};

export default ManagerSettings;
