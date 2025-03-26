import MetaTags from "@/components/Common/MetaTags";
import NotLoggedIn from "@/components/Shared/NotLoggedIn";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { APP_NAME } from "@hey/data/constants";
import { GridItemEight, GridItemFour, GridLayout } from "@hey/ui";
import SettingsSidebar from "../Sidebar";
import LinkUsername from "./LinkUsername";
import UnlinkUsername from "./UnlinkUsername";

const UsernameSettings = () => {
  const { currentAccount } = useAccountStore();

  if (!currentAccount) {
    return <NotLoggedIn />;
  }

  return (
    <GridLayout>
      <MetaTags title={`Username settings • ${APP_NAME}`} />
      <GridItemFour>
        <SettingsSidebar />
      </GridItemFour>
      <GridItemEight className="space-y-5">
        <UnlinkUsername />
        <LinkUsername />
      </GridItemEight>
    </GridLayout>
  );
};

export default UsernameSettings;
