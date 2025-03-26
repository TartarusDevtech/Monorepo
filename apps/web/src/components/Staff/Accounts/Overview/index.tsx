import MetaTags from "@/components/Common/MetaTags";
import Loader from "@/components/Shared/Loader";
import AccountStaffTool from "@/components/Staff/Accounts/Overview/Tool";
import StaffSidebar from "@/components/Staff/Sidebar";
import hasAccess from "@/helpers/hasAccess";
import Custom404 from "@/pages/404";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { UserIcon } from "@heroicons/react/24/outline";
import { APP_NAME } from "@hey/data/constants";
import { Features } from "@hey/data/features";
import { useAccountQuery } from "@hey/indexer";
import {
  Card,
  EmptyState,
  ErrorMessage,
  GridItemEight,
  GridItemFour,
  GridLayout
} from "@hey/ui";
import { useRouter } from "next/router";

const Overview = () => {
  const {
    isReady,
    query: { address }
  } = useRouter();
  const { currentAccount } = useAccountStore();
  const isStaff = hasAccess(Features.Staff);

  const { data, error, loading } = useAccountQuery({
    skip: !address || !isReady,
    variables: { request: { address: address } }
  });

  const account = data?.account;

  if (!currentAccount || !isStaff) {
    return <Custom404 />;
  }

  return (
    <GridLayout>
      <MetaTags title={`Staff Tools • Account Overview • ${APP_NAME}`} />
      <GridItemFour>
        <StaffSidebar />
      </GridItemFour>
      <GridItemEight>
        <Card className="!bg-yellow-300/20 border-yellow-600 border-dashed p-5">
          {loading ? (
            <Loader className="my-5" message="Loading account" />
          ) : account ? (
            error ? (
              <ErrorMessage error={error} />
            ) : (
              <AccountStaffTool account={account} />
            )
          ) : (
            <EmptyState
              hideCard
              icon={<UserIcon className="size-8" />}
              message="No account found"
            />
          )}
        </Card>
      </GridItemEight>
    </GridLayout>
  );
};

export default Overview;
