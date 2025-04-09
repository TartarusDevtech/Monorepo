import { Button, Modal, TabButton } from "@/components/Shared/UI";
import { MotionTabIndicator } from "@/components/Shared/UI/TabButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import AddAccountManager from "./AddAccountManager";
import Managed from "./Management/Managed";
import Unmanaged from "./Management/Unmanaged";
import Managers from "./Managers";

enum Type {
  MANAGED = "MANAGED",
  MANAGERS = "MANAGERS",
  UNMANAGED = "UNMANAGED"
}

const AccountManager = () => {
  const [type, setType] = useState<Type>(Type.MANAGERS);
  const [showAddManagerModal, setShowAddManagerModal] = useState(false);

  const tabs = [
    { name: "Managers", type: Type.MANAGERS },
    { name: "Managed", type: Type.MANAGED },
    { name: "Un-managed", type: Type.UNMANAGED }
  ];

  return (
    <div className="linkify space-y-2">
      <div className="mx-5 mt-5 flex items-center justify-between">
        <li className="flex items-center gap-3">
          {tabs.map((tab) => {
            const isSelected = type === tab.type;
            return (
              <div key={tab.type} className="relative">
                {isSelected && (
                  <MotionTabIndicator layoutId="account-manager-tabs" />
                )}
                <TabButton
                  active={isSelected}
                  name={tab.name}
                  onClick={() => setType(tab.type)}
                  type={tab.type}
                  className="relative"
                />
              </div>
            );
          })}
        </li>
        {type === Type.MANAGERS && (
          <>
            <Button
              icon={<PlusCircleIcon className="size-4" />}
              onClick={() => setShowAddManagerModal(true)}
              size="sm"
            >
              Add manager
            </Button>
            <Modal
              onClose={() => setShowAddManagerModal(false)}
              show={showAddManagerModal}
              title="Add Account Manager"
            >
              <AddAccountManager
                setShowAddManagerModal={setShowAddManagerModal}
              />
            </Modal>
          </>
        )}
      </div>
      {type === Type.MANAGERS && <Managers />}
      {type === Type.MANAGED && <Managed />}
      {type === Type.UNMANAGED && <Unmanaged />}
    </div>
  );
};

export default AccountManager;
