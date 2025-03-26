import { Card } from "@/components/Shared/UI";
import hasAccess from "@/helpers/hasAccess";
import { Features } from "@hey/data/features";
import type { AccountFragment } from "@hey/indexer";
import CreatorTool from "./CreatorTool";
import StaffTool from "./StaffTool";

interface InternalToolsProps {
  account: AccountFragment;
}

const InternalTools = ({ account }: InternalToolsProps) => {
  const isStaff = hasAccess(Features.Staff);

  if (!isStaff) {
    return null;
  }

  const Tools = () => (
    <>
      <CreatorTool account={account} />
      <StaffTool account={account} />
    </>
  );

  return (
    <Card
      as="aside"
      className="!bg-yellow-300/20 mb-4 space-y-5 border-yellow-400 p-5 text-yellow-600"
      forceRounded
    >
      <Tools />
    </Card>
  );
};

export default InternalTools;
