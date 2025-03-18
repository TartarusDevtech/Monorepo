import type { FC } from "react";
import { useBlockAlertStore } from "src/store/non-persisted/alert/useBlockAlertStore";
import { useMuteAlertStore } from "src/store/non-persisted/alert/useMuteAlertStore";
import BlockOrUnblockAccount from "./Alert/BlockOrUnblockAccount";
import DeletePost from "./Alert/DeletePost";
import MuteOrUnmuteAccount from "./Alert/MuteOrUnmuteAccount";

const GlobalAlerts: FC = () => {
  const { mutingOrUnmutingAccount } = useMuteAlertStore();
  const { blockingorUnblockingAccount } = useBlockAlertStore();

  return (
    <>
      <DeletePost />
      {blockingorUnblockingAccount && <BlockOrUnblockAccount />}
      {mutingOrUnmutingAccount && <MuteOrUnmuteAccount />}
    </>
  );
};

export default GlobalAlerts;
