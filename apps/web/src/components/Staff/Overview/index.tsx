import Custom404 from "@/components/Shared/404";
import { PageLayout } from "@/components/Shared/PageLayout";
import isFeatureEnabled from "@/helpers/isFeatureEnabled";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { Features } from "@hey/data/features";
import Sponsorship from "./Sponsorship";

const StaffOverview = () => {
  const { currentAccount } = useAccountStore();
  const isStaff = isFeatureEnabled(Features.Staff);

  if (!currentAccount || !isStaff) {
    return <Custom404 />;
  }

  return (
    <PageLayout title="Staff Tools">
      <Sponsorship />
    </PageLayout>
  );
};

export default StaffOverview;
