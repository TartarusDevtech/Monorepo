import { Card } from "@/components/Shared/UI";
import humanize from "@/helpers/humanize";
import type { ReactNode } from "react";
import { H4 } from "./Typography";

interface NumberedStatsProps {
  count?: string;
  name: ReactNode;
  suffix?: string;
}

const NumberedStat = ({ count, name, suffix }: NumberedStatsProps) => {
  return (
    <Card className="p-5" forceRounded>
      <div>{name}</div>
      <H4 className="tracking-wide">
        {humanize(Number(count))} <span className="text-sm">{suffix}</span>
      </H4>
    </Card>
  );
};

export default NumberedStat;
