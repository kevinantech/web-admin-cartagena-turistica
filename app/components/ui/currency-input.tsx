import React from "react";
import CurrencyInputField, { type CurrencyInputProps } from "react-currency-input-field";
import { cn } from "~/lib/utils";

const CurrencyInput = React.forwardRef<
  HTMLInputElement,
  CurrencyInputProps & { error?: boolean }
>(({ error, className, prefix, ...props }, ref) => {
  return (
    <CurrencyInputField
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        {
          "border-destructive focus-visible:ring-destructive focus-visible:border-input":
            error,
        },
        className
      )}
      ref={ref}
      prefix={`${prefix || "$"} `}
      {...props}
    />
  );
});

CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
