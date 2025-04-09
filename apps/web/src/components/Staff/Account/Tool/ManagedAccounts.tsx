import SmallSingleAccount from "@/components/Shared/Account/SmallSingleAccount";
import { H5 } from "@/components/Shared/UI";
import { UsersIcon } from "@heroicons/react/24/outline";
import { useAccountsAvailableQuery } from "@hey/indexer";
import { Link } from "react-router";

interface ManagedAccountsProps {
  address: string;
}

const ManagedAccounts = ({ address }: ManagedAccountsProps) => {
  const { data, loading } = useAccountsAvailableQuery({
    variables: {
      lastLoggedInAccountRequest: { address },
      accountsAvailableRequest: { managedBy: address }
    }
  });

  return (
    <>
      <div className="divider my-5 border-yellow-600 border-dashed" />
      <div className="mt-5 flex items-center space-x-2 text-yellow-600">
        <UsersIcon className="size-5" />
        <H5>Managed accounts</H5>
      </div>
      <div className="mt-3">
        {loading ? (
          <div>Loading managed accounts...</div>
        ) : (
          <div className="space-y-2">
            {data?.accountsAvailable.items.map((accountAvailable) => (
              <div key={accountAvailable.account.address}>
                <Link to={`/staff/account/${accountAvailable.account.address}`}>
                  <SmallSingleAccount account={accountAvailable.account} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ManagedAccounts;
