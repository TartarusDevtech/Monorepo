import ToggleWithHelper from "@components/Shared/ToggleWithHelper";
import trackEvent from "@helpers/analytics";
import { useTRPC } from "@helpers/createTRPCClient";
import errorToast from "@helpers/errorToast";
import { SwatchIcon } from "@heroicons/react/24/outline";
import { Events } from "@hey/data/events";
import { useMutation } from "@tanstack/react-query";
import type { FC } from "react";
import toast from "react-hot-toast";
import { usePreferencesStore } from "src/store/persisted/usePreferencesStore";

const IncludeLowScore: FC = () => {
  const { includeLowScore, setIncludeLowScore } = usePreferencesStore();
  const trpc = useTRPC();
  const { mutate, isPending } = useMutation(
    trpc.preferences.update.mutationOptions({
      onSuccess: (data) => {
        setIncludeLowScore(data.includeLowScore);
        trackEvent(Events.Account.UpdateSettings, {
          type: "toggle_include_low_score"
        });
        toast.success("Notification preference updated");
      },
      onError: errorToast
    })
  );

  return (
    <ToggleWithHelper
      description="Turn on low-signal notification filter"
      disabled={isPending}
      heading="Notification Signal filter"
      icon={<SwatchIcon className="size-5" />}
      on={includeLowScore}
      setOn={() => mutate({ includeLowScore: !includeLowScore })}
    />
  );
};

export default IncludeLowScore;
