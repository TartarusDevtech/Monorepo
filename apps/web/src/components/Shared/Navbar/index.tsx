import NotificationIcon from "@/components/Notification/NotificationIcon";
import { H6, Image } from "@/components/Shared/UI";
import cn from "@/helpers/cn";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { usePreferencesStore } from "@/store/persisted/usePreferencesStore";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { STATIC_IMAGES_URL } from "@hey/data/constants";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import MenuItems from "./MenuItems";
import MoreNavItems from "./MoreNavItems";
import Search from "./Search";

const Navbar = () => {
  const { currentAccount } = useAccountStore();
  const { appIcon } = usePreferencesStore();
  const [showSearch, setShowSearch] = useState(false);

  interface NavItemProps {
    current: boolean;
    name: string;
    url: string;
  }

  const NavItem = ({ current, name, url }: NavItemProps) => {
    return (
      <Link
        className={cn(
          "cursor-pointer rounded-md px-2 py-1 text-left tracking-wide md:px-3",
          {
            "bg-neutral-200 dark:bg-neutral-800": current,
            "text-neutral-700 hover:bg-neutral-200 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white":
              !current
          }
        )}
        to={url}
      >
        <H6>{name}</H6>
      </Link>
    );
  };

  const NavItems = () => {
    const { pathname } = useLocation();

    return (
      <>
        <NavItem current={pathname === "/"} name="Home" url="/" />
        <NavItem
          current={pathname === "/explore"}
          name="Explore"
          url="/explore"
        />
        <MoreNavItems />
      </>
    );
  };

  return (
    <header className="divider sticky top-0 z-10 w-full bg-white dark:bg-black">
      <div className="container mx-auto max-w-screen-xl px-5">
        <div className="relative flex h-14 items-center justify-between sm:h-16">
          <div className="flex items-center justify-start">
            <button
              aria-label="Search"
              className="inline-flex items-center justify-center rounded-md text-neutral-500 focus:outline-hidden md:hidden"
              onClick={() => setShowSearch(!showSearch)}
              type="button"
            >
              {showSearch ? (
                <XMarkIcon className="size-6" />
              ) : (
                <MagnifyingGlassIcon className="size-6" />
              )}
            </button>
            <Link
              className="hidden rounded-full outline-offset-8 md:block"
              to="/"
            >
              <Image
                alt="Logo"
                className="size-8"
                src={`${STATIC_IMAGES_URL}/app-icon/${appIcon}.png`}
                height={32}
                width={32}
              />
            </Link>
            <div className="hidden sm:ml-6 md:block">
              <div className="flex items-center space-x-4">
                <div className="hidden md:block">
                  <Search />
                </div>
                <NavItems />
              </div>
            </div>
          </div>
          <Link
            className={cn("md:hidden", !currentAccount?.address && "ml-[60px]")}
            to="/"
          >
            <Image
              alt="Logo"
              className="size-7"
              height={32}
              src={`${STATIC_IMAGES_URL}/app-icon/${appIcon}.png`}
              width={32}
            />
          </Link>
          <div className="flex items-center gap-4">
            {currentAccount ? <NotificationIcon /> : null}
            <MenuItems />
          </div>
        </div>
      </div>
      {showSearch ? (
        <div className="m-3 md:hidden">
          <Search />
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
