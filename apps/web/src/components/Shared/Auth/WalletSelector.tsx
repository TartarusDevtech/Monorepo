import cn from "@/helpers/cn";
import { KeyIcon } from "@heroicons/react/24/outline";
import { STATIC_IMAGES_URL } from "@hey/data/constants";
import { Errors } from "@hey/data/errors";
import { useModal } from "connectkit";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { useAccount, useConnect, useConnectors, useDisconnect } from "wagmi";

const WalletSelector = () => {
  const { setOpen } = useModal();
  const { disconnect } = useDisconnect();
  const { connector: activeConnector } = useAccount();
  const connectors = useConnectors();
  const { connectAsync, isPending } = useConnect();

  const connectWithFamily = async () => {
    try {
      const connector = connectors.find(
        (c) => c.id === "familyAccountsProvider"
      );

      if (!connector) {
        return;
      }

      return await connectAsync({ connector });
    } catch {
      return toast.error(Errors.SomethingWentWrong);
    }
  };

  const buttonClass = cn(
    "flex w-full items-center justify-between space-x-2.5 overflow-hidden rounded-xl border border-neutral-200 px-4 py-3 outline-hidden hover:bg-neutral-100 disabled:opacity-50 dark:border-neutral-700 dark:hover:bg-neutral-700"
  );

  return activeConnector?.id ? (
    <div className="space-y-2.5">
      <button
        className="flex items-center space-x-1 text-sm underline"
        onClick={() => disconnect?.()}
        type="reset"
      >
        <KeyIcon className="size-4" />
        <div>Change wallet</div>
      </button>
    </div>
  ) : (
    <div className="inline-block w-full space-y-3 overflow-hidden text-left align-middle">
      <button
        className={buttonClass}
        onClick={connectWithFamily}
        type="button"
        disabled={isPending}
      >
        Continue with Family
        <img
          alt="Family"
          className="size-6"
          src={`${STATIC_IMAGES_URL}/brands/family.png`}
        />
      </button>
      <button
        className={buttonClass}
        onClick={() => setOpen(true)}
        type="button"
        disabled={isPending}
      >
        Use other wallet
        <img
          alt="Family"
          className="size-6"
          src={`${STATIC_IMAGES_URL}/brands/wallet.svg`}
        />
      </button>
      <div className="linkify text-neutral-500 text-sm">
        By connecting wallet, you agree to our{" "}
        <Link to="/terms" target="_blank">
          Terms
        </Link>{" "}
        and{" "}
        <Link to="/privacy" target="_blank">
          Policy
        </Link>
        .
      </div>
    </div>
  );
};

export default WalletSelector;
