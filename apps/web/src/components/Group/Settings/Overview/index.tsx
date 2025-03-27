import MetaTags from "@/components/Common/MetaTags";
import Custom404 from "@/components/Shared/404";
import Custom500 from "@/components/Shared/500";
import NotLoggedIn from "@/components/Shared/NotLoggedIn";
import {
  GridItemEight,
  GridItemFour,
  GridLayout,
  PageLoading
} from "@/components/Shared/UI";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { APP_NAME } from "@hey/data/constants";
import { useGroupQuery } from "@hey/indexer";
import { useParams } from "react-router";
import SettingsSidebar from "../Sidebar";
import GroupSettingsForm from "./Form";

const GroupSettings = () => {
  const { address } = useParams<{ address: string }>();
  const { currentAccount } = useAccountStore();

  const { data, loading, error } = useGroupQuery({
    variables: { request: { group: address } },
    skip: !address
  });

  if (!address || loading) {
    return <PageLoading />;
  }

  if (error) {
    return <Custom500 />;
  }

  const group = data?.group;

  if (!group || currentAccount?.address !== group.owner) {
    return <Custom404 />;
  }

  if (!currentAccount) {
    return <NotLoggedIn />;
  }

  return (
    <GridLayout>
      <MetaTags title={`Group settings • ${APP_NAME}`} />
      <GridItemFour>
        <SettingsSidebar group={group} />
      </GridItemFour>
      <GridItemEight className="space-y-5">
        <GroupSettingsForm group={group} />
      </GridItemEight>
    </GridLayout>
  );
};

export default GroupSettings;
