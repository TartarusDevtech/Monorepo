import { Tooltip } from "@/components/Shared/UI";
import cn from "@/helpers/cn";
import isVerified from "@/helpers/isVerified";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

interface VerifiedProps {
  address: string;
  showTooltip?: boolean;
  iconClassName?: string;
}

const Verified = ({
  address,
  showTooltip = false,
  iconClassName = ""
}: VerifiedProps) => {
  if (!isVerified(address)) {
    return null;
  }

  if (!showTooltip) {
    return (
      <CheckBadgeIcon className={cn("size-6 text-brand-500", iconClassName)} />
    );
  }

  return (
    <Tooltip content="Verified">
      <CheckBadgeIcon className={cn("size-6 text-brand-500", iconClassName)} />
    </Tooltip>
  );
};

export default Verified;
