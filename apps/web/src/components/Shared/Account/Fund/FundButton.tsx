import { Button } from "@/components/Shared/UI";
import {
  type FundingToken,
  useFundModalStore
} from "@/store/non-persisted/modal/useFundModalStore";

interface TransferFundButtonProps {
  size?: "sm" | "md";
  outline?: boolean;
  className?: string;
  token?: FundingToken;
}

const TransferFundButton = ({
  size = "md",
  outline = false,
  className = "",
  token
}: TransferFundButtonProps) => {
  const { setShowFundModal } = useFundModalStore();

  return (
    <Button
      aria-label="Transfer fund"
      className={className}
      onClick={() => setShowFundModal(true, token)}
      size={size}
      outline={outline}
    >
      Transfer fund
    </Button>
  );
};

export default TransferFundButton;
