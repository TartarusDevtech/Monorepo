import MetaTags from "@/components/Common/MetaTags";
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from "@/components/Shared/UI";
import hasAccess from "@/helpers/hasAccess";
import Custom404 from "@/pages/404";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { APP_NAME } from "@hey/data/constants";
import { Features } from "@hey/data/features";
import StaffSidebar from "../Sidebar";
import List from "./List";

const Accounts = () => {
  const { currentAccount } = useAccountStore();
  const isStaff = hasAccess(Features.Staff);

  if (!currentAccount || !isStaff) {
    return <Custom404 />;
  }

  return (
    <GridLayout>
      <MetaTags title={`Staff Tools • Users • ${APP_NAME}`} />
      <GridItemFour>
        <StaffSidebar />
      </GridItemFour>
      <GridItemEight>
        <List />
      </GridItemEight>
    </GridLayout>
  );
};

export default Accounts;
