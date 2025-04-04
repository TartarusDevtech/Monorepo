import MetaTags from "@/components/Common/MetaTags";
import { Button, H2 } from "@/components/Shared/UI";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { APP_NAME } from "@hey/data/constants";

const Custom500 = () => {
  const clearLocalData = () => {
    localStorage.clear();
    setTimeout(() => location.reload(), 200);
  };

  return (
    <div className="page-center flex-col">
      <MetaTags title={`500 • ${APP_NAME}`} />
      <div className="py-10 text-center">
        <H2 className="mb-4">Looks like something went wrong!</H2>
        <div className="mb-4 text-neutral-500 dark:text-neutral-200">
          We track these errors automatically, but if the problem persists feel
          free to contact us. In the meantime, try refreshing.
        </div>
        <Button
          className="mx-auto flex items-center"
          icon={<ArrowPathIcon className="size-4" />}
          onClick={() => clearLocalData()}
          size="lg"
        >
          Clear cache and refresh
        </Button>
      </div>
    </div>
  );
};

export default Custom500;
