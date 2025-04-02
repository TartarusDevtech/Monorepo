import cn from "@/helpers/cn";
import { UserIcon } from "@heroicons/react/24/outline";

interface YourAccountProps {
  className?: string;
}

const YourAccount = ({ className = "" }: YourAccountProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-center space-x-1.5 text-neutral-700 text-sm dark:text-neutral-200",
        className
      )}
    >
      <UserIcon className="size-4" />
      <div>Your account</div>
    </div>
  );
};

export default YourAccount;
