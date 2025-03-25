import trackEvent from "@helpers/analytics";
import errorToast from "@helpers/errorToast";
import { trpc } from "@helpers/trpc";
import { CheckCircleIcon as CheckCircleIconOutline } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";
import { APP_NAME, STATIC_IMAGES_URL } from "@hey/data/constants";
import { Events } from "@hey/data/events";
import { Card, CardHeader, Tooltip } from "@hey/ui";
import { useMutation } from "@tanstack/react-query";
import type { FC } from "react";
import toast from "react-hot-toast";
import { usePreferencesStore } from "src/store/persisted/usePreferencesStore";

const icons = [
  { id: 0, name: "Default" },
  { id: 1, name: "Pride" },
  { id: 2, name: "Emerald" },
  { id: 3, name: "Indigo" },
  { id: 4, name: "Violet" }
];

const AppIcon: FC = () => {
  const { appIcon, setAppIcon } = usePreferencesStore();
  const { mutate, isPending } = useMutation(
    trpc.preferences.update.mutationOptions({
      onSuccess: (data) => {
        setAppIcon(data.appIcon ?? 0);
        trackEvent(Events.Account.UpdateSettings, {
          type: "set_app_icon",
          id: data.appIcon
        });
        toast.success("App icon updated");
      },
      onError: errorToast
    })
  );

  return (
    <Card>
      <CardHeader
        body={`Choose a custom app icon for ${APP_NAME}, that will be used everywhere on the app.`}
        title="Choose App Icon"
      />
      <div className="m-5 flex flex-wrap items-center gap-x-8">
        {icons.map((icon) => (
          <Tooltip content={icon.name} key={icon.id} placement="top">
            <button
              className="flex flex-col items-center space-y-2"
              disabled={isPending}
              onClick={() => mutate({ appIcon: icon.id })}
              type="button"
            >
              <img
                alt={icon.name}
                className="size-10"
                src={`${STATIC_IMAGES_URL}/app-icon/${icon.id}.png`}
              />
              {icon.id === appIcon ? (
                <CheckCircleIconSolid className="size-5 text-green-500" />
              ) : (
                <CheckCircleIconOutline className="ld-text-gray-500 size-5" />
              )}
            </button>
          </Tooltip>
        ))}
      </div>
    </Card>
  );
};

export default AppIcon;
