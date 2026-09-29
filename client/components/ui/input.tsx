import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {},
    defaultVariants: {},
  }
);

type InputVariantProps = VariantProps<typeof inputVariants>;

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputVariantProps {
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Compon = asChild ? 'span' : 'input';
    return (
      <Compon
        ref={ref}
        className={clsx(inputVariants({ className}))}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input, type InputVariantProps };
