import cn from "@/helpers/cn";
import getAccount from "@hey/helpers/getAccount";
import type { AccountFragment } from "@hey/indexer";
import type { ReactNode } from "react";
import { Link } from "react-router";
import Slug from "./Slug";

interface FallbackAccountNameProps {
  className?: string;
  account?: AccountFragment;
  separator?: ReactNode;
}

const FallbackAccountName = ({
  className = "",
  account,
  separator = ""
}: FallbackAccountNameProps) => {
  if (!account) {
    return null;
  }

  const { name, link, usernameWithPrefix } = getAccount(account);
  const accountName = account?.metadata?.name || (
    <Slug slug={usernameWithPrefix} />
  );

  return (
    <>
      <Link
        aria-label={`Account of ${name || usernameWithPrefix}`}
        className={cn(
          "max-w-sm truncate outline-hidden hover:underline focus:underline",
          className
        )}
        to={link}
      >
        <b className="whitespace-nowrap">{accountName}</b>
      </Link>
      {separator && <span>{separator}</span>}
    </>
  );
};

export default FallbackAccountName;
