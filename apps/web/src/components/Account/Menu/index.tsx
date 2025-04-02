import MenuTransition from "@/components/Shared/MenuTransition";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import stopEventPropagation from "@hey/helpers/stopEventPropagation";
import type { AccountFragment } from "@hey/indexer";
import { Fragment } from "react";
import Block from "./Block";
import CopyLink from "./CopyLink";
import Mute from "./Mute";
import Report from "./Report";

interface AccountMenuProps {
  account: AccountFragment;
}

const AccountMenu = ({ account }: AccountMenuProps) => {
  const { currentAccount } = useAccountStore();

  return (
    <Menu as="div" className="relative">
      <MenuButton as={Fragment}>
        <button
          aria-label="More"
          className="rounded-full p-1.5 hover:bg-neutral-300/20"
          onClick={stopEventPropagation}
          type="button"
        >
          <EllipsisVerticalIcon className="size-5 text-neutral-500 dark:text-neutral-200" />
        </button>
      </MenuButton>
      <MenuTransition>
        <MenuItems
          className="absolute z-[5] mt-1 w-max rounded-xl border border-neutral-200 bg-white shadow-xs focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-900"
          static
        >
          <CopyLink account={account} />
          {currentAccount && currentAccount?.address !== account.address ? (
            <>
              <Block account={account} />
              <Mute account={account} />
              <Report account={account} />
            </>
          ) : null}
        </MenuItems>
      </MenuTransition>
    </Menu>
  );
};

export default AccountMenu;
