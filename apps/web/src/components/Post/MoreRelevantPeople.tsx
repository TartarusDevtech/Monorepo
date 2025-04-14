import SingleAccount from "@/components/Shared/Account/SingleAccount";
import cn from "@/helpers/cn";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { accountsList } from "@/variants";
import type { AccountFragment } from "@hey/indexer";
import { motion } from "motion/react";
import { Virtuoso } from "react-virtuoso";

interface MoreRelevantPeopleProps {
  accounts: AccountFragment[];
}

const MoreRelevantPeople = ({ accounts }: MoreRelevantPeopleProps) => {
  const { currentAccount } = useAccountStore();

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <Virtuoso
        className="!h-[80vh]"
        // remove the first 5 accounts from the list because they are already shown in the sidebar
        data={accounts.slice(5)}
        itemContent={(index, account) => (
          <motion.div
            className={cn(
              "divider p-5",
              index === accounts.slice(5).length - 1 && "border-b-0"
            )}
            variants={accountsList}
            initial="hidden"
            animate="visible"
          >
            <SingleAccount
              hideFollowButton={currentAccount?.address === account.address}
              hideUnfollowButton={currentAccount?.address === account.address}
              account={account}
              showBio
              showUserPreview={false}
            />
          </motion.div>
        )}
      />
    </div>
  );
};

export default MoreRelevantPeople;
