import { Badge } from "@/components/Shared/UI";
import { StarIcon } from "@heroicons/react/24/solid";

const Beta = () => {
  return (
    <Badge className="flex items-center space-x-1">
      <StarIcon className="size-3" />
      <span>Beta</span>
    </Badge>
  );
};

export default Beta;
