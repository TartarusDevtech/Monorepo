import cn from "@/helpers/cn";
import { HandRaisedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface SupportProps {
  className?: string;
}

const Support = ({ className = "" }: SupportProps) => {
  return (
    <Link
      className={cn(
        "flex w-full items-center space-x-1.5 px-2 py-1.5 text-gray-700 text-sm dark:text-gray-200",
        className
      )}
      href="/support"
    >
      <HandRaisedIcon className="size-4" />
      <div>Support</div>
    </Link>
  );
};

export default Support;
