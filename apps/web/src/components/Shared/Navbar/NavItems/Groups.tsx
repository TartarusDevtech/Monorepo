import cn from "@/helpers/cn";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

interface GroupsProps {
  className?: string;
  onClick?: () => void;
}

const Groups = ({ className = "", onClick }: GroupsProps) => {
  return (
    <Link
      className={cn(
        "flex w-full items-center space-x-1.5 px-2 py-1.5 text-gray-700 text-sm dark:text-gray-200",
        className
      )}
      to="/groups"
      onClick={onClick}
    >
      <UserGroupIcon className="size-4" />
      <div>Groups</div>
    </Link>
  );
};

export default Groups;
