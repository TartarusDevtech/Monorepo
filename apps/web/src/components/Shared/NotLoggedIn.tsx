import MetaTags from "@/components/Common/MetaTags";
import LoginButton from "@/components/Shared/LoginButton";
import { H2, Image } from "@/components/Shared/UI";
import { APP_NAME, STATIC_IMAGES_URL } from "@hey/data/constants";

const NotLoggedIn = () => {
  return (
    <div className="page-center flex-col">
      <MetaTags title={`Not logged in • ${APP_NAME}`} />
      <Image
        className="size-20"
        src={`${STATIC_IMAGES_URL}/app-icon/0.png`}
        alt="Logo"
        height={80}
        width={80}
      />
      <div className="py-10 text-center">
        <H2 className="mb-4">Not logged in!</H2>
        <div className="mb-4">Log in to continue</div>
        <LoginButton isBig />
      </div>
    </div>
  );
};

export default NotLoggedIn;
