interface MetaTagsProps {
  title?: string;
}

const MetaTags = ({ title = "Hey" }: MetaTagsProps) => {
  return <title>{title}</title>;
};

export default MetaTags;
