import { HEY_APP } from "@hey/data/constants";
import { Errors } from "@hey/data/errors";
import type { Request, Response } from "express";
import { heyWalletClient } from "src/helpers/heyWalletClient";
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
  chainId: 37111,
  verifyingContract: checksumAddress(HEY_APP)
};

export const lensVerification = async (req: Request, res: Response) => {
  const { account, validator, nonce, deadline } = req.body;

  try {
    const signature = await heyWalletClient.signTypedData({
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

    return res.json({ allowed: true, signature });
  } catch {
    return res.json({ error: Errors.SomethingWentWrong });
  }
};
