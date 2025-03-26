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
import Balances from "./Balances";

const FundsSettings = () => {
  const { currentAccount } = useAccountStore();

  if (!currentAccount) {
    return <NotLoggedIn />;
  }

  return (
    <GridLayout>
      <MetaTags title={`Funds settings • ${APP_NAME}`} />
      <GridItemFour>
        <SettingsSidebar />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardHeader
            title="Manage account balances"
            body="Withdraw or deposit funds from your account."
          />
          <Balances />
        </Card>
      </GridItemEight>
    </GridLayout>
  );
};

export default FundsSettings;
