import { CHAIN, HEY_APP } from "@hey/data/constants";
import { Errors } from "@hey/data/errors";
import type { Context } from "hono";
import { privateWalletClient } from "src/utils/privateWalletClient";
import { type Address, checksumAddress } from "viem";

const TYPES = {
  SourceStamp: [
    { name: "source", type: "address" },
    { name: "originalMsgSender", type: "address" },
    { name: "validator", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" }
  ]
};

const DOMAIN = {
  name: "Lens Source",
  version: "1",
  chainId: CHAIN.id,
  verifyingContract: checksumAddress(HEY_APP)
};

const verification = async (ctx: Context) => {
  const { account, validator, nonce, deadline } = await ctx.req.json();

  try {
    const signature = await privateWalletClient.signTypedData({
      primaryType: "SourceStamp",
      types: TYPES,
      domain: DOMAIN,
      message: {
        source: checksumAddress(HEY_APP),
        originalMsgSender: checksumAddress(account as Address),
        validator: checksumAddress(validator as Address),
        nonce,
        deadline
      }
    });

    return ctx.json({ allowed: true, signature });
  } catch {
    return ctx.json({ success: false, error: Errors.SomethingWentWrong });
  }
};

export default verification;
