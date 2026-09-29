'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';

const radioGroupVariants = cva('flex items-center space-x-2', {
  variants: {},
  defaultVariants: {},
});

type RadioGroupVariantProps = VariantProps<typeof radioGroupVariants>;

type RadioGroupValue = string;

interface RadioGroupProps<T extends RadioGroupValue>
  extends React.ComponentPropsWithoutRef<'div'>,
    RadioGroupVariantProps {
  value?: T;
  onValueChange?: (value: T) => void;
  children: React.ReactNode;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps<any>>(
  ({ className, value, onValueChange, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(radioGroupVariants({ className }))}
        role="radiogroup"
        aria-required={true}
        {...props}
      >
        {children}
      </div>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

const radioGroupItemVariants = cva(
  'h-4 w-4 rounded-full border-primary bg-background checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {},
    defaultVariants: {},
  }
);

type RadioGroupItemVariantProps = VariantProps<typeof radioGroupItemVariants>;

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<'input'>,
    RadioGroupItemVariantProps {
  asChild?: boolean;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Compon = asChild ? 'span' : 'input';
    return (
      <Compon
        ref={ref}
        type="radio"
        className={clsx(radioGroupItemVariants({ className }))}
        {...props}
      />
    );
  }
);
RadioGroupItem.displayName = 'RadioGroupItem';

// RadioGroupItemLabel for shadcn/ui pattern - wraps label around input
interface RadioGroupItemLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  value: string;
  children: React.ReactNode;
}

const RadioGroupItemLabel = React.forwardRef<HTMLLabelElement, RadioGroupItemLabelProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={clsx(
          'flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-text hover:text-text focus:bg-primary focus:text-primary-foreground',
          className
        )}
        {...props}
      >
        <RadioGroupItem value={value} className="mt-0.5" />
        {children}
      </label>
    );
  }
);
RadioGroupItemLabel.displayName = 'RadioGroupItemLabel';

export { RadioGroup, RadioGroupItem, RadioGroupItemLabel };
