import "./font.css";
import "./styles.css";

import Providers from "@/components/Common/Providers";
import { IS_MAINNET, IS_PRODUCTION } from "@hey/data/constants";
import * as Sentry from "@sentry/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ignoreErrors } from "./helpers/sentry";
import { Routes } from "./routes";

Sentry.init({
  dsn: "https://34ca50ff67b4da640f968e9583b91d04@o180224.ingest.us.sentry.io/4509257430794240",
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 0.1,
  ignoreErrors,
  enabled: IS_PRODUCTION && IS_MAINNET
});

// TODO: Remove this after the one month
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  });
}

createRoot(document.getElementById("_hey_") as HTMLElement).render(
  <StrictMode>
    <Providers>
      <Routes />
    </Providers>
  </StrictMode>
);
