import "./font.css";
import "./styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { scan } from "react-scan";
import Providers from "./components/Common/Providers";
import { Routes } from "./routes";

scan({
  enabled: true
});

createRoot(document.getElementById("_hey_") as HTMLElement).render(
  <StrictMode>
    <Providers>
      <Routes />
    </Providers>
  </StrictMode>
);
