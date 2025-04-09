import { DEFAULT_OG } from "@hey/data/constants";
import type { Metadata } from "next";

const defaultMetadata: Metadata = {
  alternates: { canonical: "https://hey.xyz" },
  applicationName: "Hey",
  description:
    "A decentralized, and permissionless social media app built with Lens",
  metadataBase: new URL("https://hey.xyz"),
  openGraph: {
    images: [DEFAULT_OG],
    siteName: "Hey",
    type: "website"
  },
  title: "Hey",
  twitter: { card: "summary_large_image", site: "@heydotxyz" }
};

export default defaultMetadata;
