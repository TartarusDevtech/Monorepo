import { createTrackedSelector } from "react-tracked";
import type { Address } from "viem";
import { create } from "zustand";

export interface FundingToken {
  contractAddress: Address;
  symbol: string;
}

interface State {
  showFundModal: boolean;
  token?: FundingToken;
  setShowFundModal: (showFundModal: boolean, token?: FundingToken) => void;
}

const store = create<State>((set) => ({
  showFundModal: false,
  token: undefined,
  setShowFundModal: (showFundModal, token) =>
    set(() => ({ showFundModal, token }))
}));

export const useFundModalStore = createTrackedSelector(store);
