import ToggleWrapper from "@/components/Staff/Accounts/Overview/Tool/ToggleWrapper";
import errorToast from "@/helpers/errorToast";
import { trpc } from "@/helpers/trpc";
import { Permission, PermissionId } from "@hey/data/permissions";
import { Toggle } from "@hey/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface SuspendProps {
  address: string;
}

const Suspend = ({ address }: SuspendProps) => {
  const { data: account, isLoading } = useQuery(
    trpc.internal.account.queryOptions({ address })
  );

  const { mutate } = useMutation(
    trpc.internal.permissions.assign.mutationOptions({
      onSuccess: () => toast.success("Account suspended"),
      onError: errorToast
    })
  );

  const isSuspended =
    account?.permissions.includes(Permission.Suspended) || false;

  return (
    <div className="text-red-500">
      <ToggleWrapper title="Suspend Account">
        <Toggle
          disabled={isLoading}
          on={isSuspended}
          setOn={() =>
            mutate({
              account: address,
              enabled: true,
              permission: PermissionId.Suspended
            })
          }
        />
      </ToggleWrapper>
    </div>
  );
};

export default Suspend;
