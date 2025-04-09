import SingleAccount from "@/components/Shared/Account/SingleAccount";
import type { AccountFragment } from "@hey/indexer";
import AccountOverview from "./AccountOverview";
import ManagedAccounts from "./ManagedAccounts";
import Permissions from "./Permissions";

interface AccountStaffToolProps {
  account: AccountFragment;
}

const AccountStaffTool = ({ account }: AccountStaffToolProps) => {
  return (
    <div>
      <SingleAccount
        hideFollowButton
        hideUnfollowButton
        isBig
        linkToAccount
        account={account}
        showBio
        showUserPreview={false}
      />
      <AccountOverview account={account} />
      <Permissions address={account.address} />
      <ManagedAccounts address={account.owner} />
    </div>
  );
};

export default AccountStaffTool;
