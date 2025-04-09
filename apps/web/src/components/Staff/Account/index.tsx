import Custom404 from "@/components/Shared/404";
import BackButton from "@/components/Shared/BackButton";
import Loader from "@/components/Shared/Loader";
import { PageLayout } from "@/components/Shared/PageLayout";
import { Card, EmptyState, ErrorMessage, H5 } from "@/components/Shared/UI";
import hasAccess from "@/helpers/hasAccess";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { UserIcon } from "@heroicons/react/24/outline";
import { Features } from "@hey/data/features";
import { useAccountQuery } from "@hey/indexer";
import { useParams } from "react-router";
import AccountStaffTool from "./Tool";

const StaffAccountOverview = () => {
  const { address } = useParams<{ address: string }>();
  const { currentAccount } = useAccountStore();
  const isStaff = hasAccess(Features.Staff);

  const { data, error, loading } = useAccountQuery({
    skip: !address,
    variables: { request: { address: address } }
  });

  const account = data?.account;

  if (!currentAccount || !isStaff) {
    return <Custom404 />;
  }

  return (
    <PageLayout title="Staff Tools - Account Overview">
      <Card className="!bg-yellow-200/20 border-yellow-600 border-dashed">
        <div className="mx-5 my-3 space-y-2">
          <div className="flex items-center gap-x-3">
            <BackButton />
            <H5>Staff Tools</H5>
          </div>
        </div>
        <div className="border-yellow-600 border-b border-dashed" />
        <div className="p-5">
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
        </div>
      </Card>
    </PageLayout>
  );
};

export default StaffAccountOverview;
