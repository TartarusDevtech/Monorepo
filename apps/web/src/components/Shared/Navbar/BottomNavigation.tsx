import { Image } from "@/components/Shared/UI";
import cn from "@/helpers/cn";
import { useMobileDrawerModalStore } from "@/store/non-persisted/modal/useMobileDrawerModalStore";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import {
  BellIcon,
  GlobeAltIcon as GlobeOutline,
  HomeIcon
} from "@heroicons/react/24/outline";
import {
  BellIcon as BellIconSolid,
  GlobeAltIcon as GlobeSolid,
  HomeIcon as HomeIconSolid
} from "@heroicons/react/24/solid";
import getAvatar from "@hey/helpers/getAvatar";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import MobileDrawerMenu from "./MobileDrawerMenu";

interface NavigationItemProps {
  path: string;
  label: string;
  outline: ReactNode;
  solid: ReactNode;
  isActive: boolean;
}

const NavigationItem = ({
  path,
  label,
  outline,
  solid,
  isActive
}: NavigationItemProps) => (
  <Link aria-label={label} className="mx-auto my-3" to={path}>
    {isActive ? solid : outline}
  </Link>
);

const navigationItems = [
  {
    path: "/",
    label: "Home",
    outline: <HomeIcon className="size-6" />,
    solid: <HomeIconSolid className="size-6" />
  },
  {
    path: "/explore",
    label: "Explore",
    outline: <GlobeOutline className="size-6" />,
    solid: <GlobeSolid className="size-6" />
  },
  {
    path: "/notifications",
    label: "Notifications",
    outline: <BellIcon className="size-6" />,
    solid: <BellIconSolid className="size-6" />
  }
];

const BottomNavigation = () => {
  const { pathname } = useLocation();
  const { currentAccount } = useAccountStore();
  const { showMobileDrawer, setShowMobileDrawer } = useMobileDrawerModalStore();

  const handleProfileClick = () => setShowMobileDrawer(true);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[5] border-gray-200 border-t bg-white pb-safe md:hidden dark:border-gray-800 dark:bg-black"
      aria-label="Bottom navigation"
    >
      {showMobileDrawer && <MobileDrawerMenu />}
      <div
        className={cn("grid", currentAccount ? "grid-cols-4" : "grid-cols-3")}
      >
        {navigationItems.map(({ path, label, outline, solid }) => (
          <NavigationItem
            key={path}
            path={path}
            label={label}
            outline={outline}
            solid={solid}
            isActive={pathname === path}
          />
        ))}
        {currentAccount && (
          <button
            aria-label="Your account"
            className="m-auto h-fit"
            onClick={handleProfileClick}
            type="button"
          >
            <Image
              alt={currentAccount.address}
              className="m-0.5 size-6 rounded-full border border-gray-200 dark:border-gray-700"
              src={getAvatar(currentAccount)}
            />
          </button>
        )}
      </div>
    </nav>
  );
};

export default BottomNavigation;
