import ToggleWithHelper from "@/components/Shared/ToggleWithHelper";
import { Card, CardHeader } from "@/components/Shared/UI";
import trackEvent from "@/helpers/analytics";
import errorToast from "@/helpers/errorToast";
import useTransactionLifecycle from "@/hooks/useTransactionLifecycle";
import { useAccountStatus } from "@/store/non-persisted/useAccountStatus";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Errors } from "@hey/data/errors";
import { Events } from "@hey/data/events";
import {
  type GroupFragment,
  GroupRuleType,
  useUpdateGroupRulesMutation
} from "@hey/indexer";
import { useState } from "react";
import toast from "react-hot-toast";

interface ApprovalRuleProps {
  group: GroupFragment;
}

const ApprovalRule = ({ group }: ApprovalRuleProps) => {
  const { isSuspended } = useAccountStatus();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleTransactionLifecycle = useTransactionLifecycle();

  const approvalRule = [...group.rules.required, ...group.rules.anyOf].find(
    (rule) => rule.type === GroupRuleType.MembershipApproval
  );
  const isApprovalRuleEnabled = approvalRule !== undefined;

  const onCompleted = () => {
    setIsSubmitting(false);
    trackEvent(Events.Group.UpdateSettings, { type: "approval_rule" });
    toast.success("Approval rule updated");
  };

  const onError = (error: any) => {
    setIsSubmitting(false);
    errorToast(error);
  };

  const [updateGroupRules] = useUpdateGroupRulesMutation({
    onCompleted: async ({ updateGroupRules }) => {
      return await handleTransactionLifecycle({
        transactionData: updateGroupRules,
        onCompleted,
        onError
      });
    },
    onError
  });

  const handleUpdateRule = () => {
    if (isSuspended) {
      return toast.error(Errors.Suspended);
    }

    setIsSubmitting(true);

    return updateGroupRules({
      variables: {
        request: {
          group: group.address,
          ...(isApprovalRuleEnabled
            ? { toRemove: [approvalRule.id] }
            : {
                toAdd: {
                  required: [{ membershipApprovalRule: { enable: true } }]
                }
              })
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader
        body="Approval is required for members to join the group"
        title="Membership Approval"
      />
      <div className="m-5">
        <ToggleWithHelper
          heading="Enable Membership Approval"
          description="Toggle to require approval for new members"
          disabled={isSubmitting}
          icon={<PlusCircleIcon className="size-5" />}
          on={isApprovalRuleEnabled}
          setOn={handleUpdateRule}
        />
      </div>
    </Card>
  );
};

export default ApprovalRule;
