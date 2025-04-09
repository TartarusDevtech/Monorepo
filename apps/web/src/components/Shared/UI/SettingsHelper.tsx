import type { ReactNode } from "react";
import { H6 } from "./Typography";

interface SettingsHelperProps {
  title: ReactNode;
  body?: ReactNode;
}

const SettingsHelper = ({ title, body }: SettingsHelperProps) => {
  return (
    <div className="flex flex-col gap-y-1.5">
      <b>{title}</b>
      {body ? (
        <H6 className="font-normal text-gray-500 dark:text-gray-200">{body}</H6>
      ) : null}
    </div>
  );
};

export default SettingsHelper;
