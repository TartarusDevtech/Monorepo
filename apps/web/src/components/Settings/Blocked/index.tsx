import MetaTags from "@/components/Common/MetaTags";
import NotLoggedIn from "@/components/Shared/NotLoggedIn";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { APP_NAME } from "@hey/data/constants";
import {
  Card,
  CardHeader,
  GridItemEight,
  GridItemFour,
  GridLayout
} from "@hey/ui";
import SettingsSidebar from "../Sidebar";
import List from "./List";

const BlockedSettings = () => {
  const { currentAccount } = useAccountStore();

  if (!currentAccount) {
    return <NotLoggedIn />;
  }

  return (
    <GridLayout>
      <MetaTags title={`Blocked accounts • ${APP_NAME}`} />
      <GridItemFour>
        <SettingsSidebar />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardHeader
            body="This is a list of blocked accounts. You can unblock them at any time."
            title="Blocked accounts"
          />
          <List />
        </Card>
      </GridItemEight>
    </GridLayout>
  );
};

export default BlockedSettings;
