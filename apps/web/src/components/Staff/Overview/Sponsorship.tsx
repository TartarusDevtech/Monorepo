import Loader from "@/components/Shared/Loader";
import {
  Card,
  CardHeader,
  ErrorMessage,
  NumberedStat
} from "@/components/Shared/UI";
import { BLOCK_EXPLORER_URL, HEY_SPONSOR } from "@hey/data/constants";
import { Link } from "react-router";
import { formatEther } from "viem";
import { useBalance } from "wagmi";

const Sponsorship = () => {
  const { data, isLoading, error } = useBalance({
    address: HEY_SPONSOR,
    query: { refetchInterval: 2000 }
  });

  return (
    <Card>
      <CardHeader title="Sponsorship" />
      <div className="m-5">
        {isLoading ? (
          <Loader className="my-10" message="Loading sponsorship..." />
        ) : error ? (
          <ErrorMessage error={error} title="Failed to load sponsorship" />
        ) : (
          <div className="space-y-5">
            <div className="linkify font-bold">
              <Link
                to={`${BLOCK_EXPLORER_URL}/address/${HEY_SPONSOR}`}
                target="_blank"
              >
                Open Sponsorship Contract in Explorer
              </Link>
            </div>
            <NumberedStat
              count={formatEther(data?.value || BigInt(0))}
              name="Sponsorship Balance"
              suffix="GHO"
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default Sponsorship;
