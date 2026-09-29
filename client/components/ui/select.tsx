'use client';

import * as React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  asChild?: boolean;
  onValueChange?: (value: string) => void;
}

const SelectPrimitive = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, asChild = false, onValueChange, ...props }, ref) => {
    const Compon = asChild ? 'span' : 'select';
    return (
      <Compon
        ref={ref}
        className={clsx(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-text',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        onChange={(e) => onValueChange?.(e.target.value)}
        {...props}
      />
    );
  }
);
SelectPrimitive.displayName = 'SelectPrimitive';

// Select components for shadcn/ui style
interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const Compon = asChild ? 'span' : 'button';
    return (
      <Compon
        ref={ref}
        className={clsx(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm',
          'ring-offset-background placeholder:text-muted-text focus-visible:outline-none',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Compon>
    );
  }
);
SelectTrigger.displayName = 'SelectTrigger';

interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
}

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, children, placeholder, ...props }, ref) => {
    return (
      <span ref={ref} className={clsx('line-clamp-1', className)} {...props}>
        {children || placeholder}
      </span>
    );
  }
);
SelectValue.displayName = 'SelectValue';

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'popper' | 'inline';
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, position = 'popper', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
          position === 'popper' && 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      >
        <div className="p-1">{children}</div>
      </div>
    );
  }
);
SelectContent.displayName = 'SelectContent';

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  onSelect?: () => void;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value, disabled, onSelect, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
          'transition-colors focus:bg-primary focus:text-primary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          className
        )}
        data-value={value}
        data-disabled={disabled}
        onClick={onSelect}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <ChevronUp className="h-4 w-4" />
        </span>
        <span className="text-current">{children}</span>
      </div>
    );
  }
);
SelectItem.displayName = 'SelectItem';

// Create a composite component that works with the shadcn pattern
const Select = Object.assign(SelectPrimitive, {
  Trigger: SelectTrigger,
  Value: SelectValue,
  Content: SelectContent,
  Item: SelectItem,
});

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
