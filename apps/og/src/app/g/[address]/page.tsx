import defaultMetadata from "@/defaultMetadata";
import { AVATAR_BIG } from "@hey/data/constants";
import getAccount from "@hey/helpers/getAccount";
import getAvatar from "@hey/helpers/getAvatar";
import { GroupDocument, type GroupFragment } from "@hey/indexer";
import apolloClient from "@hey/indexer/apollo/client";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ address: string }>;
}

export const generateMetadata = async ({
  params
}: Props): Promise<Metadata> => {
  const { address } = await params;

  const { data } = await apolloClient().query({
    query: GroupDocument,
    variables: { request: { group: address } }
  });

  if (!data.group) {
    return defaultMetadata;
  }

  const group = data.group as GroupFragment;
  const title = `${group.metadata?.name || "Group"} • Hey`;
  const description = (group?.metadata?.description || title).slice(0, 155);
  const owner = getAccount(group.owner);

  return {
    alternates: { canonical: `https://hey.xyz/g/${address}` },
    applicationName: "Hey",
    creator: owner.usernameWithPrefix,
    description: description,
    metadataBase: new URL(`https://hey.xyz/g/${address}`),
    openGraph: {
      description: description,
      images: [getAvatar(group, AVATAR_BIG)],
      siteName: "Hey",
      type: "profile",
      url: `https://hey.xyz/g/${address}`
    },
    publisher: owner.usernameWithPrefix,
    title: title,
    other: { "hey:group:name": group.metadata?.name || "Group" },
    twitter: { card: "summary", site: "@heydotxyz" }
  };
};

const Page = async ({ params }: Props) => {
  const { address } = await params;
  const metadata = await generateMetadata({ params });

  if (!metadata) {
    return <h1>{address}</h1>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `https://hey.xyz/g/${address}`,
    name: metadata.other?.["hey:group:name"],
    alternateName: address,
    description: metadata.description,
    image: Array.isArray(metadata.openGraph?.images)
      ? metadata.openGraph.images[0]
      : metadata.openGraph?.images,
    url: `https://hey.xyz/g/${address}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1>{metadata.title?.toString()}</h1>
      <h2>{metadata.description?.toString()}</h2>
    </>
  );
};

export default Page;
