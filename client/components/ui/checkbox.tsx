import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const checkboxVariants = cva(
  'h-4 w-4 rounded border-primary bg-background checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {},
    defaultVariants: {},
  }
);

type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;

interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    CheckboxVariantProps {
  asChild?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Compon = asChild ? 'span' : 'input';
    return (
      <Compon
        ref={ref}
        type="checkbox"
        className={clsx(checkboxVariants({ className}))}
        {...props}
      />
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox, type CheckboxVariantProps };
