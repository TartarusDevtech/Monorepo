import { IS_MAINNET } from "@hey/data/constants";
import getRpc from "@hey/helpers/getRpc";
import "dotenv/config";
import { type Hex, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";

export const privateWalletClient = createWalletClient({
  account: privateKeyToAccount(process.env.PRIVATE_KEY as Hex),
  transport: getRpc({ mainnet: IS_MAINNET })
});
