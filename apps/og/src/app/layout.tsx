import defaultMetadata from "@/defaultMetadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = defaultMetadata;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://hey.xyz",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://hey.xyz/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
