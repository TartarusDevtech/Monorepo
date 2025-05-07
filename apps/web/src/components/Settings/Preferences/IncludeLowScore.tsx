import ToggleWithHelper from "@/components/Shared/ToggleWithHelper";
import errorToast from "@/helpers/errorToast";
import { hono } from "@/helpers/fetcher";
import trackEvent from "@/helpers/trackEvent";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { usePreferencesStore } from "@/store/persisted/usePreferencesStore";
import { SwatchIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const IncludeLowScore = () => {
  const { currentAccount } = useAccountStore();
  const { includeLowScore, setIncludeLowScore } = usePreferencesStore();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ includeLowScore }: { includeLowScore: boolean }) =>
      hono.preferences.update({ includeLowScore }),
    onSuccess: (data) => {
      setIncludeLowScore(data.includeLowScore);
      trackEvent("update_notification_preference", {
        account: currentAccount?.address,
        includeLowScore: data.includeLowScore
      });
      toast.success("Notification preference updated");
    },
    onError: errorToast
  });

  return (
    <div className="m-5">
      <ToggleWithHelper
        description="Turn on low-signal notification filter"
        disabled={isPending}
        heading="Notification Signal filter"
        icon={<SwatchIcon className="size-5" />}
        on={includeLowScore}
        setOn={() => mutate({ includeLowScore: !includeLowScore })}
      />
    </div>
  );
};

export default IncludeLowScore;
