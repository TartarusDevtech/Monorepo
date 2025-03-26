import { useAuthModalStore } from "@/store/non-persisted/modal/useAuthModalStore";
import { Button } from "@hey/ui";
import { useSignupStore } from "../Auth/Signup";

const SignupButton = () => {
  const { setShowAuthModal } = useAuthModalStore();
  const { setScreen } = useSignupStore();

  return (
    <Button
      onClick={() => {
        setScreen("choose");
        setShowAuthModal(true, "signup");
      }}
      outline
      size="md"
    >
      Signup
    </Button>
  );
};

export default SignupButton;
