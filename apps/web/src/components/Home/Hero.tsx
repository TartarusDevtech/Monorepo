import { Image } from "@/components/Shared/UI";
import { APP_NAME, STATIC_IMAGES_URL } from "@hey/data/constants";

const Hero = () => {
  return (
    <div className="divider py-12">
      <div className="mx-auto flex w-full max-w-screen-xl items-center px-5 py-8 sm:py-12">
        <Image
          alt="Hey Logo"
          className="mr-5 size-24 sm:mr-8 sm:size-36"
          src={`${STATIC_IMAGES_URL}/app-icon/0.png`}
          width={144}
          height={144}
        />
        <div className="flex-1 space-y-1 tracking-tight sm:max-w-lg">
          <div className="font-extrabold text-2xl sm:text-5xl">
            Welcome to {APP_NAME},
          </div>
          <div className="font-extrabold text-2xl text-neutral-500 sm:text-5xl dark:text-neutral-200">
            a social network built on Lens Protocols
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
