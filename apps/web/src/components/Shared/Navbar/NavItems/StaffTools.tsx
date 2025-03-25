import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import cn from "@hey/ui/cn";

interface StaffToolsProps {
  className?: string;
}

const StaffTools = ({ className = "" }: StaffToolsProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-center space-x-1.5 text-gray-700 text-sm dark:text-gray-200",
        className
      )}
    >
      <ShieldCheckIcon className="size-4" />
      <div>Staff Tools</div>
    </div>
  );
};

export default StaffTools;
