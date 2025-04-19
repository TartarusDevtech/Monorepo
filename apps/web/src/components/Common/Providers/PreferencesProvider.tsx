import { hono } from "@/helpers/fetcher";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { usePreferencesStore } from "@/store/persisted/usePreferencesStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const PreferencesProvider = () => {
  const { currentAccount } = useAccountStore();
  const { setAppIcon, setIncludeLowScore } = usePreferencesStore();

  const { data: preferences } = useQuery({
    queryFn: () => hono.preferences.get(),
    queryKey: ["preferences", currentAccount?.address],
    enabled: Boolean(currentAccount?.address)
  });

  useEffect(() => {
    if (preferences) {
      setIncludeLowScore(preferences.includeLowScore);
      setAppIcon(preferences.appIcon);
    }
  }, [preferences]);

  return null;
};

export default PreferencesProvider;
