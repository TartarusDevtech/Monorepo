import Link from "next/link";
import { useAccountStore } from "src/store/persisted/useAccountStore";
import LoginButton from "../LoginButton";
import SignedAccount from "./SignedAccount";
import SignupButton from "./SignupButton";

export const NextLink = ({ children, href, ...rest }: Record<string, any>) => (
  <Link href={href} {...rest}>
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
