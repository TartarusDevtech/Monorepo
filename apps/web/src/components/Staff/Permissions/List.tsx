import Loader from "@components/Shared/Loader";
import { useTRPC } from "@helpers/createTRPCClient";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Permission } from "@hey/data/permissions";
import formatDate from "@hey/helpers/datetime/formatDate";
import type { PermissionsRouterOutput } from "@hey/rpc/src/routers/internal/permissions";
import { Badge, Card, CardHeader, EmptyState, ErrorMessage } from "@hey/ui";
import cn from "@hey/ui/cn";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { useEffect, useState } from "react";

const List: FC = () => {
  const [permissions, setPermissions] = useState<
    [] | PermissionsRouterOutput["all"]
  >([]);
  const trpc = useTRPC();

  const { data, isLoading, error } = useQuery(
    trpc.internal.permissions.all.queryOptions()
  );

  useEffect(() => {
    if (data) {
      setPermissions(data);
    }
  }, [data]);

  return (
    <Card>
      <CardHeader title="Permissions" />
      <div className="m-5">
        {isLoading ? (
          <Loader className="my-10" message="Loading permissions..." />
        ) : error ? (
          <ErrorMessage error={error} title="Failed to load permissions" />
        ) : permissions.length ? (
          <div className="space-y-7">
            {permissions?.map((permission) => (
              <div
                key={permission.id}
                className="flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <b
                      className={cn(
                        permission.key === Permission.Suspended &&
                          "text-red-500"
                      )}
                    >
                      {permission.key}
                    </b>
                    <Badge variant="secondary">{permission.type}</Badge>
                    {permission._count.accounts !== 0 && (
                      <Badge variant="warning">
                        {permission._count.accounts} assigned
                      </Badge>
                    )}
                  </div>
                  <div className="text-gray-500 text-sm">
                    Created on {formatDate(permission.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            hideCard
            icon={<AdjustmentsHorizontalIcon className="size-8" />}
            message={<span>No permissions found</span>}
          />
        )}
      </div>
    </Card>
  );
};

export default List;
