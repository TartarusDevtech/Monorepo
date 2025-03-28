import cn from "@/helpers/cn";
import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";

interface TabButtonProps {
  active: boolean;
  badge?: ReactNode;
  className?: string;
  icon?: ReactNode;
  name: string;
  onClick?: () => void;
  showOnSm?: boolean;
  type?: string;
}

const TabButton = ({
  active,
  badge,
  className = "",
  icon,
  name,
  onClick,
  showOnSm = false,
  type
}: TabButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const updateQuery = (type?: string) => {
    if (!type) {
      return;
    }

    const params = new URLSearchParams(location.search);
    params.set("type", type);

    navigate(`${location.pathname}?${params.toString()}`, {
      replace: true
    });
  };

  return (
    <button
      aria-label={name}
      className={cn(
        { "text-black dark:text-white": active },
        { "bg-gray-300 dark:bg-gray-300/20": active },
        "hover:bg-gray-300 dark:hover:bg-gray-300/30",
        "hover:text-black hover:dark:text-white",
        "flex items-center justify-center space-x-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm sm:px-3 sm:py-1.5",
        className
      )}
      onClick={() => {
        updateQuery(type);
        onClick?.();
      }}
      type="button"
    >
      {icon}
      <span className={cn({ "hidden sm:block": !showOnSm })}>{name}</span>
      {badge}
    </button>
  );
};

export default TabButton;
