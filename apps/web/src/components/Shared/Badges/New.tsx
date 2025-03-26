import { Badge } from "@/components/Shared/UI";
import { SparklesIcon } from "@heroicons/react/24/solid";

const New = () => {
  return (
    <Badge className="flex items-center space-x-1 border-blue-600 bg-blue-500">
      <SparklesIcon className="size-3" />
      <div>New</div>
    </Badge>
  );
};

export default New;
