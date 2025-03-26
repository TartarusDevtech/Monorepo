import { useSwitchAccountModalStore } from "@/store/non-persisted/modal/useSwitchAccountModalStore";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import cn from "@hey/ui/cn";

interface SwitchAccountProps {
  className?: string;
}

const SwitchAccount = ({ className = "" }: SwitchAccountProps) => {
  const { setShowSwitchAccountModal } = useSwitchAccountModalStore();

  return (
    <button
      className={cn(
        "flex w-full items-center space-x-2 px-2 py-1.5 text-left text-gray-700 text-sm focus:outline-none dark:text-gray-200",
        className
      )}
      onClick={() => setShowSwitchAccountModal(true)}
      type="button"
    >
      <ArrowsRightLeftIcon className="size-4" />
      <span>Switch account</span>
    </button>
  );
};

export default SwitchAccount;
