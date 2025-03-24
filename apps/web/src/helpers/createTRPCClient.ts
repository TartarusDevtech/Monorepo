import { HEY_TRPC_URL } from "@hey/data/constants";
import type { AppRouter } from "@hey/rpc/src";
import { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpLink } from "@trpc/client";
import {
  createTRPCContext,
  createTRPCOptionsProxy
} from "@trpc/tanstack-react-query";
import { hydrateAuthTokens } from "src/store/persisted/useAuthStore";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }
});

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpLink({
      url: HEY_TRPC_URL,
      headers() {
        return { "x-id-token": hydrateAuthTokens().accessToken || "" };
      }
    })
  ]
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient
});

export const { TRPCProvider } = createTRPCContext<AppRouter>();
