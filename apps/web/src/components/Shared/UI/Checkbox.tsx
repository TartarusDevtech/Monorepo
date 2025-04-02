import cn from "@/helpers/cn";
import type { ComponentProps } from "react";
import { forwardRef, useId } from "react";

interface CheckboxProps extends Omit<ComponentProps<"input">, "prefix"> {
  className?: string;
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ className = "", label, ...props }, ref) {
    const id = useId();

    return (
      <div className="flex items-center">
        <input
          className={cn(
            "mr-2 cursor-pointer rounded border-neutral-300 transition duration-200 focus:ring-neutral-500 dark:text-neutral-500",
            className
          )}
          id={id}
          ref={ref}
          type="checkbox"
          {...props}
        />
        <label className="inline-block whitespace-nowrap" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }
);
