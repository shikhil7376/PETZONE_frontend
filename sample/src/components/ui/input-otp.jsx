import React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef((props, ref) => {
  const { className, containerClassName, ...otherProps } = props;
  return (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...otherProps}
    />
  );
});

InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <div ref={ref} className={cn("flex items-center", className)} {...otherProps} />
  );
});

InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef((props, ref) => {
  const { index, className, ...otherProps } = props;
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center  border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...otherProps}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});

InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} role="separator" {...props}>
      <Dot />
    </div>
  );
});

InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
