import { hydrateAuthTokens } from "@/store/persisted/useAuthStore";
import type { AppRouter } from "@hey/api/src";
import { HEY_TRPC_URL } from "@hey/data/constants";
import { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpLink } from "@trpc/client";
import {
  createTRPCContext,
  createTRPCOptionsProxy
} from "@trpc/tanstack-react-query";

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
