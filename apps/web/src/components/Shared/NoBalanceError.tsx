interface NoBalanceErrorProps {
  assetSymbol?: string;
}

const NoBalanceError = ({ assetSymbol }: NoBalanceErrorProps) => {
  return (
    <div className="text-sm">
      You don't have enough <b>{assetSymbol || "funds"}</b>
    </div>
  );
};

export default NoBalanceError;
