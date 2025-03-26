import MetaTags from "@/components/Common/MetaTags";
import NotLoggedIn from "@/components/Shared/NotLoggedIn";
import {
  Card,
  CardHeader,
  GridItemEight,
  GridItemFour,
  GridLayout
} from "@/components/Shared/UI";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { APP_NAME } from "@hey/data/constants";
import SettingsSidebar from "../Sidebar";
import List from "./List";

const SessionsSettings = () => {
  const { currentAccount } = useAccountStore();

  if (!currentAccount) {
    return <NotLoggedIn />;
  }

  return (
    <GridLayout>
      <MetaTags title={`Sessions settings • ${APP_NAME}`} />
      <GridItemFour>
        <SettingsSidebar />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardHeader
            body="This is a list of devices that have logged into your account. Revoke any sessions that you do not recognize."
            title="Sessions"
          />
          <List />
        </Card>
      </GridItemEight>
    </GridLayout>
  );
};

export default SessionsSettings;
