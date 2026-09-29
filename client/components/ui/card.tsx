import { forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Compon = asChild ? 'span' : 'div';
    return (
      <Compon
        ref={ref}
        className={clsx('rounded-lg border bg-card text-text shadow-sm', className)}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

export { Card };
