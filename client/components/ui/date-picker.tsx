import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const datePickerVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {},
    defaultVariants: {},
  }
);

type DatePickerVariantProps = VariantProps<typeof datePickerVariants>;

interface DatePickerProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    DatePickerVariantProps {
  asChild?: boolean;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Compon = asChild ? 'span' : 'input';
    return (
      <Compon
        ref={ref}
        type="date"
        className={clsx(datePickerVariants({ className}))}
        {...props}
      />
    );
  }
);
DatePicker.displayName = 'DatePicker';

export { DatePicker, type DatePickerVariantProps };
