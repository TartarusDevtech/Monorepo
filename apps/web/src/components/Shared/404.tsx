import MetaTags from "@/components/Common/MetaTags";
import { Button, H2 } from "@/components/Shared/UI";
import { HomeIcon } from "@heroicons/react/24/outline";
import { APP_NAME, STATIC_IMAGES_URL } from "@hey/data/constants";
import { Link } from "react-router";

const Custom404 = () => {
  return (
    <div className="page-center flex-col">
      <MetaTags title={`404 • ${APP_NAME}`} />
      <img
        alt="Nyan Cat"
        className="h-60"
        height={240}
        src={`${STATIC_IMAGES_URL}/gifs/nyan-cat.gif`}
      />
      <div className="py-10 text-center">
        <H2 className="mb-4">Oops, Lost‽</H2>
        <div className="mb-4">This page could not be found.</div>
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

export default Custom404;
