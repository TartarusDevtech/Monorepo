import { useAuthModalStore } from "@/store/non-persisted/modal/useAuthModalStore";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSignupStore } from "./Auth/Signup";

const GlobalModalsFromUrl = () => {
  const { isReady, push, query } = useRouter();
  const { currentAccount } = useAccountStore();
  const { setShowAuthModal } = useAuthModalStore();
  const { setScreen } = useSignupStore();

  useEffect(() => {
    if (isReady && query.signup && !currentAccount?.address) {
      setScreen("choose");
      setShowAuthModal(true, "signup");

      // Remove query param
      push({ pathname: "/" }, undefined, { shallow: true });
    }
  }, [isReady, query, currentAccount, setScreen, setShowAuthModal, push]);

  return null;
};

export default GlobalModalsFromUrl;
