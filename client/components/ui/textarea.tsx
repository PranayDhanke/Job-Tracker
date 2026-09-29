import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const textareaVariants = cva(
  'flex min-h-[3rem] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
  {
    variants: {},
    defaultVariants: {},
  }
);

type TextareaVariantProps = VariantProps<typeof textareaVariants>;

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextareaVariantProps {
  asChild?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Compon = asChild ? 'span' : 'textarea';
    return (
      <Compon
        ref={ref}
        className={clsx(textareaVariants({ className}))}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea, type TextareaVariantProps };
