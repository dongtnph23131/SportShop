import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

const SwitchGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white p-1 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
      className
    )}
    {...props}
  />
));
SwitchGroup.displayName = RadioGroupPrimitive.Root.displayName;

const SwitchGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "focus-visible:ring-gray-950 dark:ring-offset-gray-950 dark:data-[state=checked]:bg-gray-950 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=checked]:bg-gray-300 data-[state=checked]:text-gray-900 data-[state=checked]:shadow-sm dark:focus-visible:ring-gray-300 dark:data-[state=on]:text-gray-50",
      className
    )}
    {...props}
  />
));
SwitchGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { SwitchGroup, SwitchGroupItem };
