import { createTrackedSelector } from "react-tracked";
import { create } from "zustand";

interface State {
  showFundModal: boolean;
  useNativeToken: boolean;
  setShowFundModal: (showFundModal: boolean, useNativeToken?: boolean) => void;
}

const store = create<State>((set) => ({
  showFundModal: false,
  useNativeToken: false,
  setShowFundModal: (showFundModal, useNativeToken) =>
    set(() => ({ showFundModal, useNativeToken }))
}));

export const useFundModalStore = createTrackedSelector(store);
