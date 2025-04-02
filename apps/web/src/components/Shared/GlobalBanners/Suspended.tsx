import { GridItemEight, GridLayout } from "@/components/Shared/UI";
import { useAccountStatus } from "@/store/non-persisted/useAccountStatus";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { APP_NAME } from "@hey/data/constants";
import { Link } from "react-router";

const Suspended = () => {
  const { isSuspended } = useAccountStatus();

  if (!isSuspended) {
    return null;
  }

  return (
    <div className="border-neutral-300 border-b bg-neutral-500/20">
      <GridLayout>
        <GridItemEight className="space-y-1">
          <div className="flex items-center space-x-2 text-neutral-700">
            <NoSymbolIcon className="size-5" />
            <div className="font-bold text-base sm:text-lg">
              Your account has been suspended by {APP_NAME}.
            </div>
          </div>
          <div className="text-neutral-500 text-sm">
            Because of that, your account may limit your ability to interact
            with {APP_NAME} and other users.{" "}
            <Link to="/support">Contact us</Link> if you think this is a
            mistake.
          </div>
        </GridItemEight>
      </GridLayout>
    </div>
  );
};

export default Suspended;
