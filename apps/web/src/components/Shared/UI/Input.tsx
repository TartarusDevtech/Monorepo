import cn from "@/helpers/cn";
import type { ComponentProps, ReactNode } from "react";
import { forwardRef, useId } from "react";
import { FieldError } from "./Form";
import HelpTooltip from "./HelpTooltip";

interface InputProps extends Omit<ComponentProps<"input">, "prefix"> {
  className?: string;
  error?: boolean;
  helper?: ReactNode;
  hideError?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  label?: ReactNode;
  prefix?: ReactNode | string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className = "",
    error,
    helper,
    hideError = false,
    iconLeft,
    iconRight,
    label,
    prefix,
    type = "text",
    ...props
  },
  ref
) {
  const id = useId();

  const iconStyles = [
    "text-zinc-500 [&>*]:peer-focus:text-neutral-500 [&>*]:h-5",
    { "!text-red-500 [&>*]:peer-focus:!text-red-500": error }
  ];

  return (
    <label className="w-full" htmlFor={id}>
      {label ? (
        <div className="mb-1 flex items-center space-x-1.5">
          <div className="font-medium text-neutral-800 dark:text-neutral-200">
            {label}
          </div>
          <HelpTooltip>{helper}</HelpTooltip>
        </div>
      ) : null}
      <div className="flex">
        {prefix ? (
          <span className="inline-flex items-center rounded-l-xl border border-neutral-300 border-r-0 bg-neutral-100 px-3 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
            {prefix}
          </span>
        ) : null}
        <div
          className={cn(
            { "!bg-neutral-500/20 opacity-50": props.disabled },
            error ? "!border-red-500" : "focus-within:ring-1",
            prefix ? "rounded-r-xl" : "rounded-xl",
            "flex w-full items-center border border-neutral-300 bg-white focus-within:border-neutral-500 focus-within:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-900"
          )}
        >
          <input
            className={cn(
              { "placeholder:text-red-500": error },
              prefix ? "rounded-r-xl" : "rounded-xl",
              "peer w-full border-none bg-transparent outline-hidden focus:ring-0",
              className
            )}
            id={id}
            ref={ref}
            type={type}
            {...props}
          />
          <span
            className={cn({ "order-first pl-3": iconLeft }, iconStyles)}
            tabIndex={-1}
          >
            {iconLeft}
          </span>
          <span
            className={cn({ "order-last pr-3": iconRight }, iconStyles)}
            tabIndex={-1}
          >
            {iconRight}
          </span>
        </div>
      </div>
      {!hideError && props.name ? <FieldError name={props.name} /> : null}
    </label>
  );
});
