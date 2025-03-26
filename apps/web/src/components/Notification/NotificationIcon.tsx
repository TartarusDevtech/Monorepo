import { Tooltip } from "@/components/Shared/UI";
import { BellIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const NotificationIcon = () => {
  return (
    <Tooltip content="Notifications" placement="bottom">
      <Link
        className="hidden rounded-md px-2 py-1 hover:bg-gray-300/20 md:flex"
        href="/notifications"
      >
        <BellIcon className="size-5 sm:size-6" />
      </Link>
    </Tooltip>
  );
};

export default NotificationIcon;
