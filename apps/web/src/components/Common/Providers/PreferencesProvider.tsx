import getCurrentSession from "@/helpers/getCurrentSession";
import { trpc } from "@/helpers/trpc";
import { useAccountStatus } from "@/store/non-persisted/useAccountStatus";
import { usePreferencesStore } from "@/store/persisted/usePreferencesStore";
import { useVerifiedMembersStore } from "@/store/persisted/useVerifiedMembersStore";
import { Permission } from "@hey/data/permissions";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const PreferencesProvider = () => {
  const { address: sessionAccountAddress } = getCurrentSession();
  const { setVerifiedMembers } = useVerifiedMembersStore();
  const { setAppIcon, setIncludeLowScore } = usePreferencesStore();
  const { setStatus } = useAccountStatus();

  const { data: verified } = useQuery(trpc.misc.verified.queryOptions());

  useEffect(() => {
    setVerifiedMembers(verified ?? []);
  }, [verified]);

  const { data: preferences } = useQuery(
    trpc.preferences.get.queryOptions(undefined, {
      enabled: Boolean(sessionAccountAddress)
    })
  );

  useEffect(() => {
    if (preferences) {
      setIncludeLowScore(preferences.includeLowScore);
      setAppIcon(preferences.appIcon);
      setStatus({
        isSuspended: preferences.permissions.includes(Permission.Suspended)
      });
    }
  }, [preferences]);

  return null;
};

export default PreferencesProvider;
