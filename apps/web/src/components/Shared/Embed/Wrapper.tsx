import stopEventPropagation from "@hey/helpers/stopEventPropagation";
import { Card } from "@hey/ui";
import cn from "@hey/ui/cn";
import type { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  className?: string;
  zeroPadding?: boolean;
}

const Wrapper = ({
  children,
  className = "",
  zeroPadding = false
}: WrapperProps) => (
  <Card
    className={cn("mt-3 cursor-auto", className, { "p-5": !zeroPadding })}
    forceRounded
    onClick={stopEventPropagation}
  >
    {children}
  </Card>
);

export default Wrapper;
