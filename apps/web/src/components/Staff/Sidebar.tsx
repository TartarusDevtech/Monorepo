import Sidebar from "@/components/Shared/Sidebar";
import {
  AdjustmentsHorizontalIcon,
  ClipboardIcon,
  UserIcon
} from "@heroicons/react/24/outline";

const sidebarItems = [
  {
    icon: <ClipboardIcon className="size-4" />,
    title: "Overview",
    url: "/staff"
  },
  {
    icon: <UserIcon className="size-4" />,
    title: "Accounts",
    url: "/staff/accounts"
  },
  {
    icon: <AdjustmentsHorizontalIcon className="size-4" />,
    title: "Permissions",
    url: "/staff/permissions"
  }
];

const StaffSidebar = () => {
  return (
    <div className="mb-4 px-3 sm:px-0">
      <Sidebar items={sidebarItems} />
    </div>
  );
};

export default StaffSidebar;
