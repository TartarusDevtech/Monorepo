import { HEY_APP } from "@hey/data/constants";
import { Regex } from "@hey/data/regex";
import { TRPCError } from "@trpc/server";
import { type Address, checksumAddress } from "viem";
import { z } from "zod";
import { heyWalletClient } from "../../helpers/heyWalletClient";
import { publicProcedure } from "../../trpc";

const ParamsSchema = z.object({
  nonce: z.string(),
  deadline: z.string(),
  operation: z.string(),
  account: z.string().regex(Regex.evmAddress),
  validator: z.string().regex(Regex.evmAddress)
});

const ResponseSchema = z.object({
  allowed: z.boolean(),
  signature: z.string()
});

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
  .input(ParamsSchema)
  .output(ResponseSchema)
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
