import cn from "@/helpers/cn";
import { MenuItem } from "@headlessui/react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import type { AccountFragment } from "@hey/indexer";
import { Link } from "react-router";

interface StaffToolProps {
  account: AccountFragment;
}

const StaffTool = ({ account }: StaffToolProps) => {
  return (
    <MenuItem
      as={Link}
      to={`/staff/account/${account.address}`}
      className={({ focus }) =>
        cn(
          { "dropdown-active": focus },
          "m-2 flex cursor-pointer items-center space-x-2 rounded-lg px-2 py-1.5 text-sm"
        )
      }
    >
      <ShieldCheckIcon className="size-4" />
      <div>Staff tools</div>
    </MenuItem>
  );
};

export default StaffTool;
