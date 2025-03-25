import type { ReactNode } from "react";
import { H5 } from "./Typography";

interface CardHeaderProps {
  body?: ReactNode;
  hideDivider?: boolean;
  title: ReactNode;
}

const CardHeader = ({ body, hideDivider = false, title }: CardHeaderProps) => {
  return (
    <>
      <div className="m-5 space-y-2">
        <H5>{title}</H5>
        {body ? <p>{body}</p> : null}
      </div>
      {hideDivider ? null : <div className="divider" />}
    </>
  );
};

export default CardHeader;
