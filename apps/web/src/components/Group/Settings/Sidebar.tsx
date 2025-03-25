import Sidebar from "@components/Shared/Sidebar";
import SingleGroup from "@components/Shared/SingleGroup";
import { LockClosedIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import type { GroupFragment } from "@hey/indexer";
import { useRouter } from "next/router";

interface SettingsSidebarProps {
  group: GroupFragment;
}

const SettingsSidebar = ({ group }: SettingsSidebarProps) => {
  const {
    pathname,
    query: { address }
  } = useRouter();

  const sidebarItems = [
    {
      icon: <UserGroupIcon className="size-4" />,
      title: "Group",
      url: `/g/${address}/settings`,
      active: pathname === "/g/[address]/settings"
    },
    {
      icon: <LockClosedIcon className="size-4" />,
      title: "Group Rules",
      url: `/g/${address}/settings/rules`,
      active: pathname === "/g/[address]/settings/rules"
    }
  ];

  return (
    <div className="mb-4 px-3 sm:px-0">
      <div className="pb-3">
        <SingleGroup group={group} hideJoinButton hideLeaveButton />
      </div>
      <Sidebar items={sidebarItems} />
    </div>
  );
};

export default SettingsSidebar;
