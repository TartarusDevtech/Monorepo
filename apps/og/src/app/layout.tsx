import defaultMetadata from "@/defaultMetadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = defaultMetadata;

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
