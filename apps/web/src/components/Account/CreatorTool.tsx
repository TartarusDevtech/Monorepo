import ToggleWrapper from "@components/Staff/Accounts/Overview/Tool/ToggleWrapper";
import { trpc } from "@helpers/createTRPCClient";
import errorToast from "@helpers/errorToast";
import { Permission, PermissionId } from "@hey/data/permissions";
import type { AccountFragment } from "@hey/indexer";
import { Toggle } from "@hey/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CreatorToolProps {
  account: AccountFragment;
}

const CreatorTool: FC<CreatorToolProps> = ({ account }) => {
  const [permissions, setPermissions] = useState<string[]>([]);

  const { data: preferences, isLoading } = useQuery(
    trpc.internal.account.queryOptions({ address: account.address })
  );

  const { mutate, isPending } = useMutation(
    trpc.internal.creatorTools.assign.mutationOptions({
      onSuccess: () => {
        toast.success("Permission updated");
      },
      onError: errorToast
    })
  );

  useEffect(() => {
    if (preferences) {
      setPermissions(preferences.permissions || []);
    }
  }, [preferences]);

  const togglePermission = async (permission: { id: string; key: string }) => {
    const { id, key } = permission;
    const enabled = !permissions.includes(key);

    await mutate({
      account: account.address,
      permission: id,
      enabled
    });

    setPermissions((prev) =>
      enabled ? [...prev, key] : prev.filter((f) => f !== key)
    );
  };

  const allowedPermissions = [
    { id: PermissionId.Verified, key: Permission.Verified },
    { id: PermissionId.StaffPick, key: Permission.StaffPick }
  ];

  return (
    <div className="space-y-2.5">
      <div className="font-bold">Creator Tool</div>
      <div className="space-y-2 pt-2 font-bold">
        {allowedPermissions.map((permission) => (
          <ToggleWrapper key={permission.id} title={permission.key}>
            <Toggle
              disabled={isLoading || isPending}
              on={permissions.includes(permission.key)}
              setOn={() => togglePermission(permission)}
            />
          </ToggleWrapper>
        ))}
      </div>
    </div>
  );
};

export default CreatorTool;
