import FollowersYouKnow from "@/components/Shared/Modal/FollowersYouKnow";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import getAccount from "@hey/helpers/getAccount";
import getAvatar from "@hey/helpers/getAvatar";
import { type Follower, useFollowersYouKnowQuery } from "@hey/indexer";
import { Modal, StackedAvatars } from "@hey/ui";
import cn from "@hey/ui/cn";
import { type ReactNode, useState } from "react";

interface FollowersYouKnowOverviewProps {
  username: string;
  address: string;
  viaPopover?: boolean;
}

const FollowersYouKnowOverview = ({
  username,
  address,
  viaPopover = false
}: FollowersYouKnowOverviewProps) => {
  const { currentAccount } = useAccountStore();
  const [showMutualFollowersModal, setShowMutualFollowersModal] =
    useState(false);

  const { data, error, loading } = useFollowersYouKnowQuery({
    skip: !address || !currentAccount?.address,
    variables: {
      request: {
        observer: currentAccount?.address,
        target: address
      }
    }
  });

  const accounts =
    (data?.followersYouKnow?.items.slice(0, 4) as Follower[]) || [];

  const renderAccountNames = () => {
    const names = accounts.map((account) => getAccount(account.follower).name);
    const count = names.length - 3;

    if (names.length === 0) return null;
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} and ${names[1]}`;
    if (names.length === 3)
      return `${names[0]}, ${names[1]}${count === 0 ? " and " : ", "}${names[2]}${count ? ` and ${count} other${count === 1 ? "" : "s"}` : ""}`;

    return `${names[0]}, ${names[1]}, ${names[2]} and others`;
  };

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <button
      className={cn(
        viaPopover ? "text-xs" : "text-sm",
        "ld-text-gray-500 flex cursor-pointer items-center space-x-2"
      )}
      onClick={() => setShowMutualFollowersModal(true)}
      type="button"
    >
      <StackedAvatars
        avatars={accounts.map((account) => getAvatar(account))}
        limit={3}
      />
      <div className="text-left">
        <span>Followed by </span>
        {children}
      </div>
      <Modal
        onClose={() => setShowMutualFollowersModal(false)}
        show={showMutualFollowersModal}
        title="Mutual Followers"
        size="md"
      >
        <FollowersYouKnow username={username} address={address} />
      </Modal>
    </button>
  );

  if (accounts.length === 0 || loading || error) {
    return null;
  }

  return <Wrapper>{renderAccountNames()}</Wrapper>;
};

export default FollowersYouKnowOverview;
