import cn from "@/helpers/cn";
import type { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  className?: string;
  classNameChild?: string;
}

export const GridLayout = ({
  children,
  className = "",
  classNameChild = ""
}: GridProps) => {
  return (
    <div
      className={cn(
        "container mx-auto mt-8 mb-2 max-w-screen-xl grow px-0 sm:px-5",
        className
      )}
    >
      <div className={cn("grid grid-cols-11 lg:gap-8", classNameChild)}>
        {children}
      </div>
    </div>
  );
};

export const GridItemFour = ({ children, className = "" }: GridProps) => {
  return (
    <div className={cn("col-span-11 md:col-span-11 lg:col-span-4", className)}>
      {children}
    </div>
  );
};

export const GridItemEight = ({ children, className = "" }: GridProps) => {
  return (
    <div
      className={cn("col-span-11 mb-5 md:col-span-11 lg:col-span-7", className)}
    >
      {children}
    </div>
  );
};

export const GridItemTwelve = ({ children, className = "" }: GridProps) => {
  return (
    <div
      className={cn(
        "col-span-12 mb-5 md:col-span-12 lg:col-span-12",
        className
      )}
    >
      {children}
    </div>
  );
};
