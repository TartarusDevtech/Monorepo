import BackButton from "@/components/Shared/BackButton";
import NotLoggedIn from "@/components/Shared/NotLoggedIn";
import { PageLayout } from "@/components/Shared/PageLayout";
import WrongWallet from "@/components/Shared/Settings/WrongWallet";
import { Card, CardHeader } from "@/components/Shared/UI";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { useAccount } from "wagmi";
import DeleteSettings from "./Delete";

const DangerSettings = () => {
  const { currentAccount } = useAccountStore();
  const { address } = useAccount();
  const disabled = currentAccount?.owner !== address;

  if (!currentAccount) {
    return <NotLoggedIn />;
  }

  return (
    <PageLayout title="Delete account">
      <Card>
        <CardHeader
          icon={<BackButton path="/settings" />}
          title="Delete account"
        />
        {disabled ? <WrongWallet /> : <DeleteSettings />}
      </Card>
    </PageLayout>
  );
};

export default DangerSettings;
