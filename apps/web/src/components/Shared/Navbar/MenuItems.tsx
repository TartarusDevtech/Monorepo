import { useAccountStore } from "@/store/persisted/useAccountStore";
import { Link } from "react-router";
import LoginButton from "../LoginButton";
import SignedAccount from "./SignedAccount";
import SignupButton from "./SignupButton";

export const NextLink = ({ children, to, ...rest }: Record<string, any>) => (
  <Link to={to} {...rest}>
    {children}
  </Link>
);

const MenuItems = () => {
  const { currentAccount } = useAccountStore();

  if (currentAccount) {
    return <SignedAccount />;
  }

  return (
    <div className="flex items-center space-x-2">
      <SignupButton />
      <LoginButton />
    </div>
  );
};

export default MenuItems;
