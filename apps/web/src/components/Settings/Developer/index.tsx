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
import Tokens from "./Tokens";

const DeveloperSettings = () => {
  const { currentAccount } = useAccountStore();

  if (!currentAccount) {
    return <NotLoggedIn />;
  }

  return (
    <GridLayout>
      <MetaTags title={`Developer settings • ${APP_NAME}`} />
      <GridItemFour>
        <SettingsSidebar />
      </GridItemFour>
      <GridItemEight className="space-y-5">
        <Tokens />
      </GridItemEight>
    </GridLayout>
  );
};

export default DeveloperSettings;
