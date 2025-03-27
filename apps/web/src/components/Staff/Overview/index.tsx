import MetaTags from "@/components/Common/MetaTags";
import Custom404 from "@/components/Shared/404";
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from "@/components/Shared/UI";
import hasAccess from "@/helpers/hasAccess";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { APP_NAME } from "@hey/data/constants";
import { Features } from "@hey/data/features";
import StaffSidebar from "../Sidebar";
import App from "./App";
import Sponsorship from "./Sponsorship";

const StaffOverview = () => {
  const { currentAccount } = useAccountStore();
  const isStaff = hasAccess(Features.Staff);

  if (!currentAccount || !isStaff) {
    return <Custom404 />;
  }

  return (
    <GridLayout>
      <MetaTags title={`Staff Tools • Overview • ${APP_NAME}`} />
      <GridItemFour>
        <StaffSidebar />
      </GridItemFour>
      <GridItemEight className="space-y-5">
        <App />
        <Sponsorship />
      </GridItemEight>
    </GridLayout>
  );
};

export default StaffOverview;
