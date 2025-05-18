import { createWalletClient, http, type Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";

const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);

const signer = createWalletClient({
  account,
  chain: mainnet,
  transport: http()
});

export default signer;
