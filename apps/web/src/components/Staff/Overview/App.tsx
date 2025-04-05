import Loader from "@/components/Shared/Loader";
import {
  Card,
  CardHeader,
  ErrorMessage,
  NumberedStat
} from "@/components/Shared/UI";
import {
  DEVELOPER_PORTAL_URL,
  HEY_APP,
  HEY_TREASURY
} from "@hey/data/constants";
import { Link } from "react-router";
import { formatEther } from "viem";
import { useBalance } from "wagmi";

const App = () => {
  const { data, isLoading, error } = useBalance({
    address: HEY_TREASURY,
    query: { refetchInterval: 2000 }
  });

  return (
    <Card>
      <CardHeader title="App" />
      <div className="m-5">
        {isLoading ? (
          <Loader className="my-10" message="Loading App..." />
        ) : error ? (
          <ErrorMessage error={error} title="Failed to load App" />
        ) : (
          <div className="space-y-5">
            <div className="linkify font-bold">
              <Link
                to={`${DEVELOPER_PORTAL_URL}/apps/${HEY_APP}`}
                target="_blank"
              >
                Open App Contract in Portal
              </Link>
            </div>
            <NumberedStat
              count={formatEther(data?.value || BigInt(0))}
              name="Treasury Balance"
              suffix="GHO"
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default App;
