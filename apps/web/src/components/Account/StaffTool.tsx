import Suspend from "@/components/Shared/Account/Suspend";
import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import type { AccountFragment } from "@hey/indexer";
import { Link } from "react-router";

interface StaffToolProps {
  account: AccountFragment;
}

const StaffTool = ({ account }: StaffToolProps) => {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="font-bold">Staff Tool</div>
        <Link
          className="text-yellow-600"
          to={`/staff/accounts/${account.address}`}
        >
          <ComputerDesktopIcon className="size-4" />
        </Link>
      </div>
      <div className="space-y-2 pt-2 font-bold">
        <Suspend address={account.address} />
      </div>
    </div>
  );
};

export default StaffTool;
