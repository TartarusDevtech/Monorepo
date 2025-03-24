import { HEY_APP } from "@hey/data/constants";
import { Regex } from "@hey/data/regex";
import { TRPCError } from "@trpc/server";
import { type Address, checksumAddress } from "viem";
import { object, string } from "zod";
import { heyWalletClient } from "../../helpers/heyWalletClient";
import { publicProcedure } from "../../trpc";

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

export const verification = publicProcedure
  .input(
    object({
      nonce: string(),
      deadline: string(),
      operation: string(),
      account: string().regex(Regex.evmAddress),
      validator: string().regex(Regex.evmAddress)
    })
  )
  .mutation(async ({ input }) => {
    try {
      const { account, validator, nonce, deadline } = input;
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

      return { allowed: true, signature };
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
