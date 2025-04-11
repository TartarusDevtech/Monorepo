import { Card } from "@/components/Shared/UI";
import { LinkIcon } from "@heroicons/react/24/outline";

interface EmptyOembedProps {
  url: string;
}

const EmptyOembed = ({ url }: EmptyOembedProps) => {
  return (
    <div className="mt-4 w-full text-sm md:w-4/6">
      <Card className="truncate p-5" forceRounded>
        <div className="space-y-1">
          <div className="flex items-center space-x-1.5">
            <LinkIcon className="size-4 text-gray-500 dark:text-gray-200" />
            <b className="max-w-sm truncate">{url}</b>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmptyOembed;
