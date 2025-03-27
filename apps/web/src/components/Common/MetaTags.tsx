import { APP_NAME, DEFAULT_OG, DESCRIPTION } from "@hey/data/constants";

interface MetaTagsProps {
  creator?: string;
  description?: string;
  title?: string;
}

const MetaTags = ({
  creator,
  description = DESCRIPTION,
  title = APP_NAME
}: MetaTagsProps) => {
  return (
    <head>
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta
        content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        name="viewport"
      />

      <meta content={APP_NAME} property="og:site_name" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={DEFAULT_OG} property="og:image" />

      <meta content="summary_large_image" property="twitter:card" />
      <meta content={APP_NAME} property="twitter:site" />
      <meta content={title} property="twitter:title" />
      <meta content={description} property="twitter:description" />
      <meta content={DEFAULT_OG} property="twitter:image" />
      <meta content="400" property="twitter:image:width" />
      <meta content="400" property="twitter:image:height" />
      <meta content="heydotxyz" property="twitter:creator" />

      {creator && (
        <>
          <meta content={creator} property="creator" />
          <meta content={creator} property="publisher" />
        </>
      )}
    </head>
  );
};

export default MetaTags;
