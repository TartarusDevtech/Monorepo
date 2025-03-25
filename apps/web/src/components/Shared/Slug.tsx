import cn from "@hey/ui/cn";

interface SlugProps {
  className?: string;
  prefix?: string;
  slug: string;
  useBrandColor?: boolean;
}

const Slug = ({
  className = "",
  prefix = "",
  slug,
  useBrandColor = false
}: SlugProps) => {
  return (
    <span
      className={cn(
        useBrandColor ? "text-brand-500" : "ld-text-gray-500",
        className
      )}
    >
      {prefix}
      {slug}
    </span>
  );
};

export default Slug;
