import { IS_MAINNET, WALLETCONNECT_PROJECT_ID } from "@hey/data/constants";
import getRpc from "@hey/helpers/getRpc";
import { chains } from "@lens-chain/sdk/viem";
import { familyAccountsConnector } from "family";
import type { ReactNode } from "react";
import { WagmiProvider, createConfig } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";

const connectors = [
  familyAccountsConnector(),
  walletConnect({ projectId: WALLETCONNECT_PROJECT_ID }),
  injected()
];

const config = createConfig({
  chains: [IS_MAINNET ? chains.mainnet : chains.testnet],
  transports: {
    [IS_MAINNET ? chains.mainnet.id : chains.testnet.id]: getRpc({
      mainnet: IS_MAINNET
    })
  },
  connectors
});

interface Web3ProviderProps {
  children: ReactNode;
}

const Web3Provider = ({ children }: Web3ProviderProps) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

export default Web3Provider;
