import { STATIC_IMAGES_URL } from "@hey/data/constants";

interface WalletDetails {
  logo: string;
  name: string;
}

const getWalletDetails = (id: string): WalletDetails => {
  const walletDetails: Record<string, WalletDetails> = {
    familyAccountsProvider: {
      logo: `${STATIC_IMAGES_URL}/wallets/family.png`,
      name: "Login with Family"
    },
    walletConnect: {
      logo: `${STATIC_IMAGES_URL}/wallets/walletconnect.svg`,
      name: "Wallet Connect"
    },
    injected: {
      logo: `${STATIC_IMAGES_URL}/wallets/wallet.svg`,
      name: "Browser Wallet"
    }
  };

  return walletDetails[id];
};

export default getWalletDetails;
