import { Button } from "@/components/Shared/UI";
import { useFundModalStore } from "@/store/non-persisted/modal/useFundModalStore";

interface FundButtonProps {
  size?: "sm" | "md";
  outline?: boolean;
  className?: string;
  useNativeToken?: boolean;
}

const FundButton = ({
  size = "md",
  outline = false,
  className = "",
  useNativeToken = false
}: FundButtonProps) => {
  const { setShowFundModal } = useFundModalStore();

  return (
    <Button
      aria-label="Fund account"
      className={className}
      onClick={() => setShowFundModal(true, useNativeToken)}
      size={size}
      outline={outline}
    >
      Fund account
    </Button>
  );
};

export default FundButton;
