import { STATIC_IMAGES_URL } from "@hey/data/constants";
import isPrideMonth from "@hey/helpers/isPrideMonth";
import Image from "next/image";

const FullPageLoader = () => {
  const logoSrc = isPrideMonth()
    ? `${STATIC_IMAGES_URL}/app-icon/1.png`
    : `${STATIC_IMAGES_URL}/app-icon/0.png`;

  return (
    <div className="grid h-screen place-items-center">
      <Image
        className="size-28"
        src={logoSrc}
        alt="Logo"
        height={112}
        width={112}
      />
    </div>
  );
};

export default FullPageLoader;
