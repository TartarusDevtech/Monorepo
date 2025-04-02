import {
  APP_NAME,
  APP_URL,
  BRAND_COLOR,
  DESCRIPTION,
  IS_MAINNET,
  STATIC_IMAGES_URL,
  WALLETCONNECT_PROJECT_ID
} from "@hey/data/constants";
import getRpc from "@hey/helpers/getRpc";
import { chains } from "@lens-chain/sdk/viem";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import type { ReactNode } from "react";
import { WagmiProvider, createConfig } from "wagmi";

const config = createConfig(
  getDefaultConfig({
    chains: [IS_MAINNET ? chains.mainnet : chains.testnet],
    transports: {
      [IS_MAINNET ? chains.mainnet.id : chains.testnet.id]: getRpc({
        mainnet: IS_MAINNET
      })
    },
    walletConnectProjectId: WALLETCONNECT_PROJECT_ID,
    appName: APP_NAME,
    appDescription: DESCRIPTION,
    appUrl: APP_URL,
    appIcon: `${STATIC_IMAGES_URL}/app-icon/0.png`
  })
);

interface Web3ProviderProps {
  children: ReactNode;
}

const Web3Provider = ({ children }: Web3ProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <ConnectKitProvider
        theme="soft"
        options={{ hideNoWalletCTA: true, hideQuestionMarkCTA: true }}
        customTheme={{
          "--ck-font-family": "Sofia Pro",
          "--ck-border-radius": "12px",
          "--ck-body-background": "#ffffff",
          "--ck-focus-color": BRAND_COLOR
        }}
      >
        {children}
      </ConnectKitProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
