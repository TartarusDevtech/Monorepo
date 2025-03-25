import { Button } from "@hey/ui";
import { useFundModalStore } from "src/store/non-persisted/modal/useFundModalStore";

interface FundButtonProps {
  label?: string;
  size?: "sm" | "md";
  outline?: boolean;
  className?: string;
}

const FundButton = ({
  label = "Fund account",
  size = "md",
  outline = false,
  className = ""
}: FundButtonProps) => {
  const { setShowFundModal } = useFundModalStore();

  return (
    <Button
      aria-label="Fund account"
      className={className}
      onClick={() => setShowFundModal(true)}
      size={size}
      outline={outline}
    >
      {label}
    </Button>
  );
};

export default FundButton;
