import { forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

interface BadgeProps {
  className?: ClassValue;
  variant?: BadgeVariant;
  asChild?: boolean;
  children: React.ReactNode;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', asChild = false, children }, ref) => {
    const Compon = asChild ? 'span' : 'span';

    const variants: Record<BadgeVariant, string> = {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary-card text-secondary-card-foreground',
      destructive: 'bg-error text-error-foreground',
      outline: 'border border-input text-transparent hover:bg-accent hover:text-accent-foreground',
    };

    return (
      <Compon
        ref={ref}
        className={clsx(
          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
          'transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          variants[variant],
          className
        )}
      >
        {children}
      </Compon>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
