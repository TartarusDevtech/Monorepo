import SwitchNetwork from "@/components/Shared/SwitchNetwork";
import { CHAIN } from "@/constants";
import { createTrackedSelector } from "react-tracked";
import { useAccount, useChainId } from "wagmi";
import { create } from "zustand";
import WalletSelector from "../WalletSelector";
import ChooseUsername from "./ChooseUsername";
import Minting from "./Minting";
import Success from "./Success";

interface SignupState {
  choosedUsername: string;
  accountAddress: string;
  screen: "choose" | "minting" | "success";
  transactionHash: string;
  onboardingToken: string;
  setChoosedUsername: (username: string) => void;
  setAccountAddress: (accountAddress: string) => void;
  setScreen: (screen: "choose" | "minting" | "success") => void;
  setTransactionHash: (hash: string) => void;
  setOnboardingToken: (token: string) => void;
}

const store = create<SignupState>((set) => ({
  choosedUsername: "",
  accountAddress: "",
  screen: "choose",
  transactionHash: "",
  onboardingToken: "",
  setChoosedUsername: (username) => set({ choosedUsername: username }),
  setAccountAddress: (accountAddress) => set({ accountAddress }),
  setScreen: (screen) => set({ screen }),
  setTransactionHash: (hash) => set({ transactionHash: hash }),
  setOnboardingToken: (token) => set({ onboardingToken: token })
}));

export const useSignupStore = createTrackedSelector(store);

const Signup = () => {
  const { screen } = useSignupStore();
  const chain = useChainId();
  const { connector: activeConnector } = useAccount();

  return activeConnector?.id ? (
    <div className="space-y-2.5">
      {chain === CHAIN.id ? (
        screen === "choose" ? (
          <ChooseUsername />
        ) : screen === "minting" ? (
          <Minting />
        ) : (
          <Success />
        )
      ) : (
        <SwitchNetwork toChainId={CHAIN.id} />
      )}
    </div>
  ) : (
    <WalletSelector />
  );
};

export default Signup;
