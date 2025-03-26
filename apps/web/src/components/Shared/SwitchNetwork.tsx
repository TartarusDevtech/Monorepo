import { Button } from "@/components/Shared/UI";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { useSwitchChain } from "wagmi";

interface SwitchNetworkProps {
  className?: string;
  onSwitch?: () => void;
  title?: string;
  toChainId: number;
}

const SwitchNetwork = ({
  className = "",
  onSwitch,
  title = "Switch Network",
  toChainId
}: SwitchNetworkProps) => {
  const { switchChain } = useSwitchChain();

  return (
    <Button
      className={className}
      icon={<ArrowsRightLeftIcon className="size-4" />}
      onClick={() => {
        onSwitch?.();
        switchChain?.({ chainId: toChainId });
      }}
      type="button"
      variant="danger"
    >
      {title}
    </Button>
  );
};

export default SwitchNetwork;
