import { Button } from "@/components/Shared/UI";
import {
  type FundingToken,
  useFundModalStore
} from "@/store/non-persisted/modal/useFundModalStore";

interface FundButtonProps {
  size?: "sm" | "md";
  outline?: boolean;
  className?: string;
  token?: FundingToken;
}

const FundButton = ({
  size = "md",
  outline = false,
  className = "",
  token
}: FundButtonProps) => {
  const { setShowFundModal } = useFundModalStore();

  return (
    <Button
      aria-label="Fund account"
      className={className}
      onClick={() => setShowFundModal(true, token)}
      size={size}
      outline={outline}
    >
      Fund account
    </Button>
  );
};

export default FundButton;
