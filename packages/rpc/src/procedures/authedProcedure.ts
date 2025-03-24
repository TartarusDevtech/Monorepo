import { LENS_API_URL } from "@hey/data/constants";
import { TRPCError } from "@trpc/server";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { publicProcedure } from "../trpc";

const jwksUri = `${LENS_API_URL.replace("/graphql", "")}/.well-known/jwks.json`;
// Cache the JWKS for 12 hours
const JWKS = createRemoteJWKSet(new URL(jwksUri), {
  cacheMaxAge: 60 * 60 * 12
});

export const authedProcedure = publicProcedure.use(async (opts) => {
  const { token, account } = opts.ctx;

  if (!token) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  try {
    await jwtVerify(token, JWKS);
  } catch {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({ ctx: { ...opts.ctx, account } });
});
