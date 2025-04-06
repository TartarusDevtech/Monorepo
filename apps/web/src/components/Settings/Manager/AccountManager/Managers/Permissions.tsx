import { Checkbox } from "@/components/Shared/UI";
import trackEvent from "@/helpers/analytics";
import errorToast from "@/helpers/errorToast";
import usePollTransactionStatus from "@/hooks/usePollTransactionStatus";
import useTransactionLifecycle from "@/hooks/useTransactionLifecycle";
import { useAuthModalStore } from "@/store/non-persisted/modal/useAuthModalStore";
import { useAccountStatus } from "@/store/non-persisted/useAccountStatus";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import {} from "@heroicons/react/24/solid";
import { Errors } from "@hey/data/errors";
import { Events } from "@hey/data/events";
import {
  type AccountManagerFragment,
  useUpdateAccountManagerMutation
} from "@hey/indexer";
import { useState } from "react";
import toast from "react-hot-toast";

interface PermissionsProps {
  manager: AccountManagerFragment;
}

const Permissions = ({ manager }: PermissionsProps) => {
  const { currentAccount } = useAccountStore();
  const { isSuspended } = useAccountStatus();
  const { setShowAuthModal } = useAuthModalStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleTransactionLifecycle = useTransactionLifecycle();
  const pollTransactionStatus = usePollTransactionStatus();

  const onCompleted = (hash: string) => {
    setIsSubmitting(false);
    trackEvent(Events.Group.UpdateSettings, { type: "update_manager" });
    pollTransactionStatus(hash, () => location.reload());
  };

  const onError = (error: any) => {
    setIsSubmitting(false);
    errorToast(error);
  };

  const [updateAccountManager] = useUpdateAccountManagerMutation({
    onCompleted: async ({ updateAccountManager }) => {
      return await handleTransactionLifecycle({
        transactionData: updateAccountManager,
        onCompleted,
        onError
      });
    },
    onError
  });

  const handleUpdateManager = async (enabled: boolean, type: string) => {
    if (!currentAccount) {
      return setShowAuthModal(true);
    }

    if (isSuspended) {
      return toast.error(Errors.Suspended);
    }

    setIsSubmitting(true);

    return await updateAccountManager({
      variables: {
        request: {
          manager: manager.manager,
          permissions: {
            canExecuteTransactions:
              type === "canExecuteTransactions"
                ? enabled
                : manager.permissions.canExecuteTransactions,
            canTransferNative:
              type === "canTransferNative"
                ? enabled
                : manager.permissions.canTransferNative,
            canTransferTokens:
              type === "canTransferTokens"
                ? enabled
                : manager.permissions.canTransferTokens,
            canSetMetadataUri: true
          }
        }
      }
    });
  };

  interface PermissionProps {
    title: string;
    type: string;
    enabled: boolean;
  }

  const Permission = ({ title, type, enabled }: PermissionProps) => {
    return (
      <div className="text-gray-500 text-sm">
        <Checkbox
          label={title}
          checked={enabled}
          onChange={() => handleUpdateManager(!enabled, type)}
          disabled={isSubmitting}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-y-1">
      <Permission
        title="Can execute transactions"
        type="canExecuteTransactions"
        enabled={manager.permissions.canExecuteTransactions}
      />
      <Permission
        title="Can transfer native"
        type="canTransferNative"
        enabled={manager.permissions.canTransferNative}
      />
      <Permission
        title="Can transfer tokens"
        type="canTransferTokens"
        enabled={manager.permissions.canTransferTokens}
      />
    </div>
  );
};

export default Permissions;
