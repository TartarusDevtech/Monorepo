import { Localstorage } from "@hey/data/storage";
import type { AccountFragment } from "@hey/indexer";
import { createTrackedSelector } from "react-tracked";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  currentAccount?: AccountFragment;
  setCurrentAccount: (currentAccount?: AccountFragment) => void;
  hydrateAccount: () => AccountFragment | undefined;
}

const store = create(
  persist<State>(
    (set, get) => ({
      currentAccount: undefined,
      setCurrentAccount: (currentAccount?: AccountFragment) =>
        set(() => ({ currentAccount })),
      hydrateAccount: () => get().currentAccount
    }),
    { name: Localstorage.AccountStore }
  )
);

export const useAccountStore = createTrackedSelector(store);
export const hydrateAccount = () => store.getState().hydrateAccount();
