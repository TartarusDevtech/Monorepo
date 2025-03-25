import { StarIcon } from "@heroicons/react/24/solid";
import { Badge } from "@hey/ui";

const Beta = () => {
  return (
    <Badge className="flex items-center space-x-1">
      <StarIcon className="size-3" />
      <span>Beta</span>
    </Badge>
  );
};

export default Beta;
