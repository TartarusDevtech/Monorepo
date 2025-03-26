import { Select } from "@/components/Shared/UI";
import convertToTitleCase from "@hey/helpers/convertToTitleCase";
import { AccountReportReason } from "@hey/indexer";
import type { Dispatch, SetStateAction } from "react";

interface ReasonProps {
  setReason: Dispatch<SetStateAction<string>>;
  reason: string;
}

const Reason = ({ setReason, reason }: ReasonProps) => {
  return (
    <div className="space-y-3">
      <div className="label">Type</div>
      <Select
        onChange={(value) => setReason(value)}
        options={[
          ...Object.keys(AccountReportReason).map((reasonFromEnum) => ({
            label: convertToTitleCase(reasonFromEnum),
            selected: reason === reasonFromEnum,
            value: reasonFromEnum
          })),
          { disabled: true, label: "Select type", value: "Select type" }
        ]}
      />
    </div>
  );
};

export default Reason;
