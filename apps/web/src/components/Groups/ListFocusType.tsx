import cn from "@/helpers/cn";
import type { Dispatch, SetStateAction } from "react";
import { GroupsTabFocus } from ".";

interface ListLinkProps {
  focus?: GroupsTabFocus;
  name: string;
  setFocus: Dispatch<SetStateAction<GroupsTabFocus>>;
  type: GroupsTabFocus;
}

const ListLink = ({ focus, name, setFocus, type }: ListLinkProps) => (
  <button
    aria-label={name}
    className={cn(
      focus === type
        ? "bg-black text-white"
        : "bg-neutral-100 dark:bg-neutral-800",
      "rounded-full px-3 py-1.5 text-xs sm:px-4",
      "border border-neutral-300 dark:border-neutral-500"
    )}
    onClick={() => setFocus(type)}
    type="button"
  >
    {name}
  </button>
);

interface ListFocusTypeProps {
  focus?: GroupsTabFocus;
  setFocus: Dispatch<SetStateAction<GroupsTabFocus>>;
}

const ListFocusType = ({ focus, setFocus }: ListFocusTypeProps) => (
  <div className="mx-5 flex flex-wrap gap-3 sm:mx-0">
    <ListLink
      focus={focus}
      name="Your groups"
      setFocus={setFocus}
      type={GroupsTabFocus.Member}
    />
    <ListLink
      focus={focus}
      name="Managed groups"
      setFocus={setFocus}
      type={GroupsTabFocus.Managed}
    />
  </div>
);

export default ListFocusType;
