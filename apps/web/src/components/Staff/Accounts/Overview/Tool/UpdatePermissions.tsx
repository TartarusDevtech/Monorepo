import Loader from "@components/Shared/Loader";
import { trpc } from "@helpers/createTRPCClient";
import errorToast from "@helpers/errorToast";
import { Toggle } from "@hey/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Dispatch, FC, SetStateAction } from "react";
import toast from "react-hot-toast";
import ToggleWrapper from "./ToggleWrapper";

interface UpdatePermissionsProps {
  permissions: string[];
  accountAddress: string;
  setPermissions: Dispatch<SetStateAction<string[]>>;
}

const UpdatePermissions: FC<UpdatePermissionsProps> = ({
  permissions,
  accountAddress,
  setPermissions
}) => {
  const { data: allPermissions, isLoading } = useQuery(
    trpc.internal.permissions.all.queryOptions()
  );

  const { mutate, isPending } = useMutation(
    trpc.internal.permissions.assign.mutationOptions({
      onSuccess: () => toast.success("Permission updated"),
      onError: errorToast
    })
  );

  if (isLoading) {
    return <Loader className="my-5" message="Loading permissions" />;
  }

  const availablePermissions = allPermissions || [];
  const enabledFlags = permissions;

  const updatePermission = async ({ id, key }: { id: string; key: string }) => {
    const enabled = !enabledFlags.includes(key);

    await mutate({
      account: accountAddress,
      permission: id,
      enabled
    });

    setPermissions(
      enabled ? [...enabledFlags, key] : enabledFlags.filter((f) => f !== key)
    );
  };

  return (
    <div className="space-y-2 font-bold">
      {availablePermissions.map((permission) => (
        <ToggleWrapper key={permission.id} title={permission.key}>
          <Toggle
            disabled={isPending}
            on={enabledFlags.includes(permission.key)}
            setOn={() =>
              updatePermission({ id: permission.id, key: permission.key })
            }
          />
        </ToggleWrapper>
      ))}
    </div>
  );
};

export default UpdatePermissions;
