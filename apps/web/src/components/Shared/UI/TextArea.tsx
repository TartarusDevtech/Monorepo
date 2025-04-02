import cn from "@/helpers/cn";
import type { ComponentProps } from "react";
import { forwardRef, useId } from "react";
import { FieldError } from "./Form";

interface TextAreaProps extends ComponentProps<"textarea"> {
  label?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ label, ...props }, ref) {
    const id = useId();

    return (
      <label htmlFor={id} className="w-full">
        {label ? <div className="label">{label}</div> : null}
        <textarea
          className={cn(
            "w-full rounded-xl border border-neutral-300 bg-white px-4 py-2 shadow-xs",
            "focus:border-neutral-500 focus:ring-neutral-400",
            "disabled:bg-neutral-500/20 disabled:opacity-60",
            "dark:border-neutral-700 dark:bg-neutral-900"
          )}
          id={id}
          ref={ref}
          {...props}
        />
        {props.name ? <FieldError name={props.name} /> : null}
      </label>
    );
  }
);
