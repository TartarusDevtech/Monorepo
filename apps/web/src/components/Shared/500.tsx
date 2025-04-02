import MetaTags from "@/components/Common/MetaTags";
import { Button, H2 } from "@/components/Shared/UI";
import { HomeIcon } from "@heroicons/react/24/outline";
import { APP_NAME } from "@hey/data/constants";
import { Link } from "react-router";

const Custom500 = () => {
  return (
    <div className="page-center flex-col">
      <MetaTags title={`500 • ${APP_NAME}`} />
      <div className="py-10 text-center">
        <H2 className="mb-4">Looks like something went wrong!</H2>
        <div className="mb-4 text-neutral-500 dark:text-neutral-200">
          We track these errors automatically, but if the problem persists feel
          free to contact us. In the meantime, try refreshing.
        </div>
        <Link to="/">
          <Button
            className="mx-auto flex items-center"
            icon={<HomeIcon className="size-4" />}
            size="lg"
          >
            Go to home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Custom500;
