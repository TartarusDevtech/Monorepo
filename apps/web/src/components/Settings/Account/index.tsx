import MetaTags from "@/components/Common/MetaTags";
import NotLoggedIn from "@/components/Shared/NotLoggedIn";
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from "@/components/Shared/UI";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { APP_NAME } from "@hey/data/constants";
import SettingsSidebar from "../Sidebar";
import SuperFollow from "./SuperFollow";
import Verification from "./Verification";

const AccountSettings = () => {
  const { currentAccount } = useAccountStore();

  if (!currentAccount) {
    return <NotLoggedIn />;
  }

  return (
    <GridLayout>
      <MetaTags title={`Account settings • ${APP_NAME}`} />
      <GridItemFour>
        <SettingsSidebar />
      </GridItemFour>
      <GridItemEight className="space-y-5">
        <SuperFollow />
        <Verification />
      </GridItemEight>
    </GridLayout>
  );
};

export default AccountSettings;
