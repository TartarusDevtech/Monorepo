import MetaDetails from "@/components/Shared/MetaDetails";
import { H5, Image } from "@/components/Shared/UI";
import { BellIcon, CursorArrowRaysIcon } from "@heroicons/react/24/outline";
import {
  CheckCircleIcon,
  Cog6ToothIcon,
  XCircleIcon
} from "@heroicons/react/24/solid";
import type { PreferencesRouterOutput } from "@hey/api/src/routers/preferences";
import { STATIC_IMAGES_URL } from "@hey/data/constants";

interface AccountPreferencesProps {
  preferences: PreferencesRouterOutput["get"];
}

const AccountPreferences = ({ preferences }: AccountPreferencesProps) => {
  if (!preferences) {
    return null;
  }

  return (
    <>
      <div className="divider my-5 border-yellow-600 border-dashed" />
      <div className="flex items-center space-x-2 text-yellow-600">
        <Cog6ToothIcon className="size-5" />
        <H5>Account Preferences</H5>
      </div>
      <div className="mt-3 space-y-2">
        <MetaDetails
          icon={<CursorArrowRaysIcon className="ld-text-gray-500 size-4" />}
          title="App Icon"
        >
          <Image
            className="size-4"
            src={`${STATIC_IMAGES_URL}/app-icon/0.png`}
            alt="Logo"
            height={16}
            width={16}
          />
        </MetaDetails>
        <MetaDetails
          icon={<BellIcon className="ld-text-gray-500 size-4" />}
          title="High signal notification filter"
        >
          {preferences.includeLowScore ? (
            <CheckCircleIcon className="size-4 text-green-500" />
          ) : (
            <XCircleIcon className="size-4 text-red-500" />
          )}
        </MetaDetails>
      </div>
    </>
  );
};

export default AccountPreferences;
