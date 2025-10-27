import get from "lodash/get";
import { type ComponentPropsWithRef, forwardRef, type Ref, useId } from "react";
import { cn } from "~/utils";
import { Input } from "./input";
import { Label } from "./label";

export interface FullInputProps extends ComponentPropsWithRef<"input"> {
  label: string;
  name: string;
  errors?: Record<string, string> | null;
  inputClassName?: string;
}

const FullInput = forwardRef(
  (
    {
      errors,
      name,
      label,
      className,
      inputClassName,
      ...props
    }: FullInputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const reactId = useId();
    const id = props.id || reactId;
    const errorMessage = get(errors, name);

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <Label htmlFor={id}>{label}</Label>

        <Input
          ref={ref}
          id={id}
          name={name}
          className={cn("input w-full", inputClassName)}
          {...props}
        />

        {errorMessage && <p className="pt-4 text-red-500">{errorMessage}</p>}
      </div>
    );
  },
);

FullInput.displayName = "FullInput";

export { FullInput };
