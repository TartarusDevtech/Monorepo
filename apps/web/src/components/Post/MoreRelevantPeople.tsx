import SingleAccount from "@/components/Shared/SingleAccount";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import type { AccountFragment } from "@hey/indexer";
import { Virtuoso } from "react-virtuoso";

interface MoreRelevantPeopleProps {
  accounts: AccountFragment[];
}

const MoreRelevantPeople = ({ accounts }: MoreRelevantPeopleProps) => {
  const { currentAccount } = useAccountStore();

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <Virtuoso
        className="virtual-account-list"
        // remove the first 5 accounts from the list because they are already shown in the sidebar
        data={accounts.slice(5)}
        itemContent={(_, account) => (
          <div className="p-5">
            <SingleAccount
              hideFollowButton={currentAccount?.address === account.address}
              hideUnfollowButton={currentAccount?.address === account.address}
              account={account}
              showBio
              showUserPreview={false}
            />
          </div>
        )}
      />
    </div>
  );
};

export default MoreRelevantPeople;
